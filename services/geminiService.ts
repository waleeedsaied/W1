import { GoogleGenAI } from "@google/genai";
import { SurveyAnswers, GeminiResponseData, QuestionType, ScalableValue, YesNoValue } from '../types';
import { SURVEY_QUESTIONS } from '../constants';

const MODEL_NAME = 'gemini-2.5-flash';

// Utility function to generate the prompt for Gemini
function generateGeminiPrompt(answers: SurveyAnswers): string {
  let prompt = `Analyze the following survey responses from a mother of a child with special needs and provide helpful resources, articles, or support groups that could assist her. Focus on areas where she expressed challenges, low support, or feelings of judgment. Provide actionable advice and relevant links if possible.

Survey Responses:
`;

  SURVEY_QUESTIONS.forEach(question => {
    const answer = answers[question.id];
    if (answer) {
      prompt += `- ${question.text}: ${answer}\n`;

      // Add specific keywords for search grounding based on answers
      if (question.type === QuestionType.SCALABLE) {
        if (answer === ScalableValue.NOT_AT_ALL || answer === ScalableValue.A_LITTLE) {
          prompt += `  (Keywords: lack of ${question.id.replace(/_/g, ' ')}, need support, isolated)\n`;
        } else if (question.id === 'judged_misunderstood' && (answer === ScalableValue.VERY || answer === ScalableValue.EXTREMELY)) {
          prompt += `  (Keywords: social judgment, misunderstanding special needs mothers, stigma)\n`;
        }
      } else if (question.type === QuestionType.ESSAY) {
        // For essay questions, use the content directly for context
        prompt += `  (Keywords derived from essay content: special needs education challenges, therapy access, child progress, parenting insights)\n`;
      } else if (question.type === QuestionType.YES_NO && answer === YesNoValue.NO) {
        prompt += `  (Keywords: lack of understanding, societal barriers, non-inclusive schools)\n`;
      }
    }
  });

  prompt += `\nEnsure the suggestions are empathetic and practical. Prioritize resources that offer emotional support, educational assistance, and community building.`;

  return prompt;
}

export async function getSupportResources(answers: SurveyAnswers): Promise<GeminiResponseData> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = generateGeminiPrompt(answers);

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7, // A bit more creative for resource suggestions
        topP: 0.95,
        topK: 64,
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return { text, groundingChunks };
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    // Check for specific error message related to API key
    if (error.message && error.message.includes("Requested entity was not found.")) {
      // In a real application, you might prompt the user to re-select API key if this was a Veo model.
      // For this app, assume API_KEY is set correctly.
      throw new Error(`Failed to get resources. It seems there's an issue with the API key or model access. Details: ${error.message}`);
    }
    throw new Error(`Failed to get resources from Gemini: ${error.message || 'Unknown error'}`);
  }
}
