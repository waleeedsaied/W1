import React, { useState, useCallback, useEffect } from 'react';
import { SurveyAnswers, QuestionType, ScalableValue, YesNoValue, GeminiResponseData, GroundingChunkWeb, GroundingChunkMaps } from './types';
import { INTRO_PARAGRAPH, SURVEY_QUESTIONS } from './constants';
import SurveyQuestion from './components/SurveyQuestion';
import Button from './components/Button';
import LoadingSpinner from './components/LoadingSpinner';
import { getSupportResources } from './services/geminiService';

const App: React.FC = () => {
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = useCallback(
    (questionId: string, value: string | ScalableValue | YesNoValue) => {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: value,
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeminiResponse(null); // Clear previous response

    // Basic validation: Ensure all mandatory questions are answered
    const mandatoryQuestions = SURVEY_QUESTIONS.filter(q => q.type !== QuestionType.OPEN);
    const missingAnswers = mandatoryQuestions.filter(q => !answers[q.id]);

    if (missingAnswers.length > 0) {
      setError(`Please answer all required questions (${missingAnswers.map(q => q.text).join(', ')})`);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const response = await getSupportResources(answers);
      setGeminiResponse(response);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An unexpected error occurred while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see response
    }
  };

  const renderGroundingChunks = useCallback(() => {
    if (!geminiResponse?.groundingChunks || geminiResponse.groundingChunks.length === 0) {
      return null;
    }

    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">Relevant Resources:</h3>
        <ul className="space-y-3">
          {geminiResponse.groundingChunks.map((chunk, index) => {
            if ('web' in chunk) {
              const webChunk = chunk as GroundingChunkWeb;
              return (
                <li key={`web-${index}`} className="flex items-start text-sm">
                  <svg className="flex-shrink-0 w-5 h-5 text-blue-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 01-2.828 0z" clipRule="evenodd"></path></svg>
                  <a href={webChunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {webChunk.web.title || webChunk.web.uri}
                  </a>
                </li>
              );
            } else if ('maps' in chunk) {
              const mapsChunk = chunk as GroundingChunkMaps;
              return (
                <li key={`maps-${index}`} className="flex items-start text-sm">
                  <svg className="flex-shrink-0 w-5 h-5 text-red-400 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                  <a href={mapsChunk.maps.uri} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">
                    {mapsChunk.maps.title || mapsChunk.maps.uri}
                  </a>
                  {mapsChunk.maps.placeAnswerSources?.[0]?.reviewSnippets?.[0]?.text && (
                    <p className="ml-2 text-gray-400">"{mapsChunk.maps.placeAnswerSources[0].reviewSnippets[0].text}"</p>
                  )}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  }, [geminiResponse]);


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-3xl w-full bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
          <h1 className="text-3xl font-extrabold text-indigo-400 text-center mb-6">Thank You for Your Contribution!</h1>
          <p className="text-lg text-gray-300 leading-relaxed text-center mb-8">
            Your insights are invaluable to our project. We truly appreciate you taking the time to share your experiences.
          </p>

          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          ) : geminiResponse ? (
            <div className="mt-8 border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">Resources & Insights:</h2>
              <div className="prose max-w-none text-gray-300 leading-relaxed prose-invert">
                <p>{geminiResponse.text}</p>
              </div>
              {renderGroundingChunks()}
            </div>
          ) : null}

          <div className="mt-10 flex justify-center">
            <Button onClick={() => window.location.reload()} variant="secondary" size="lg">
              Take Survey Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-400 tracking-tight sm:text-5xl mb-4">
            Mothers of Special Needs Children Survey
          </h1>
          <p className="mt-3 text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {INTRO_PARAGRAPH}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6">
            {SURVEY_QUESTIONS.map((question) => (
              <SurveyQuestion
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={handleAnswerChange}
              />
            ))}
          </div>

          <div className="sticky bottom-0 bg-gray-800 px-4 py-4 sm:px-6 sm:py-4 border-t border-gray-700 shadow-lg -mx-4 sm:-mx-6 lg:-mx-8 z-10">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              size="lg"
              className="w-full"
            >
              {isLoading ? 'Submitting...' : 'Submit Survey'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;