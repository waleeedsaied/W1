import { Question, QuestionType, ScalableValue, YesNoValue } from './types';

export const INTRO_PARAGRAPH = `We are Media Management students at the Arab Academy for Science, Technology and Maritime Transport (AAST). As part of our graduation project, we are developing a campaign and documentary that focus on mothers of children with special needs. Our aim is to highlight their strength, resilience, and inspiring journeys. This study targets these mothers as our main audience, as we seek to shed light on their stories and the powerful role they play in society. Your contribution would mean a lot to us. Thank you.`;

export const SURVEY_QUESTIONS: Question[] = [
  // Scalable Questions
  {
    id: 'support_friends_community',
    text: 'How much do you feel supported by your friends and community?',
    type: QuestionType.SCALABLE,
    scaleOptions: [
      { value: ScalableValue.NOT_AT_ALL, label: 'Not at all' },
      { value: ScalableValue.A_LITTLE, label: 'A little' },
      { value: ScalableValue.MODERATELY, label: 'Moderately' },
      { value: ScalableValue.VERY, label: 'Very' },
      { value: ScalableValue.EXTREMELY, label: 'Extremely' },
    ],
  },
  {
    id: 'judged_misunderstood',
    text: 'How much do you feel judged or misunderstood by society?',
    type: QuestionType.SCALABLE,
    scaleOptions: [
      { value: ScalableValue.NOT_AT_ALL, label: 'Not at all' },
      { value: ScalableValue.A_LITTLE, label: 'A little' },
      { value: ScalableValue.MODERATELY, label: 'Moderately' },
      { value: ScalableValue.VERY, label: 'Very' },
      { value: ScalableValue.EXTREMELY, label: 'Extremely' },
    ],
  },
  {
    id: 'accept_adapt_child',
    text: 'How hard was it to accept and adapt to having a special needs child?',
    type: QuestionType.SCALABLE,
    scaleOptions: [
      { value: ScalableValue.NOT_AT_ALL, label: 'Not hard at all' },
      { value: ScalableValue.A_LITTLE, label: 'A little hard' },
      { value: ScalableValue.MODERATELY, label: 'Moderately hard' },
      { value: ScalableValue.VERY, label: 'Very hard' },
      { value: ScalableValue.EXTREMELY, label: 'Extremely hard' },
    ],
  },
  {
    id: 'child_treated_differently',
    text: 'How much do you feel your child is treated differently?',
    type: QuestionType.SCALABLE,
    scaleOptions: [
      { value: ScalableValue.NOT_AT_ALL, label: 'Not at all' },
      { value: ScalableValue.A_LITTLE, label: 'A little' },
      { value: ScalableValue.MODERATELY, label: 'Moderately' },
      { value: ScalableValue.VERY, label: 'Very' },
      { value: ScalableValue.EXTREMELY, label: 'Extremely' },
    ],
  },

  // Short Essay Questions
  {
    id: 'challenges_education_therapy',
    text: 'What challenges have you faced with your child’s education or therapy?',
    type: QuestionType.ESSAY,
  },
  {
    id: 'child_progress_proud',
    text: 'What progress have you seen in your child that makes you proud?',
    type: QuestionType.ESSAY,
  },
  {
    id: 'child_taught_life',
    text: 'What has your children taught you about life?',
    type: QuestionType.ESSAY,
  },
  {
    id: 'overall_motherhood_experience',
    text: 'How can you describe your overall motherhood experience?',
    type: QuestionType.ESSAY,
  },

  // Yes/No Questions
  {
    id: 'society_understands_emotionally',
    text: 'Do you feel that society understands what you go through emotionally?',
    type: QuestionType.YES_NO,
    yesNoOptions: [
      { value: YesNoValue.YES, label: 'Yes' },
      { value: YesNoValue.NO, label: 'No' },
    ],
  },
  {
    id: 'felt_judged_by_others',
    text: 'Have you ever felt judged by others for how you raise your child?',
    type: QuestionType.YES_NO,
    yesNoOptions: [
      { value: YesNoValue.YES, label: 'Yes' },
      { value: YesNoValue.NO, label: 'No' },
    ],
  },
  {
    id: 'difficult_access_education_therapy',
    text: 'Do you find it difficult to access suitable education or therapy for your child?',
    type: QuestionType.YES_NO,
    yesNoOptions: [
      { value: YesNoValue.YES, label: 'Yes' },
      { value: YesNoValue.NO, label: 'No' },
    ],
  },
  {
    id: 'schools_inclusive',
    text: 'Do you think schools are truly inclusive for special needs children?',
    type: QuestionType.YES_NO,
    yesNoOptions: [
      { value: YesNoValue.YES, label: 'Yes' },
      { value: YesNoValue.NO, label: 'No' },
    ],
  },
  {
    id: 'society_more_accepting',
    text: 'Do you think society is becoming more accepting of special needs children?',
    type: QuestionType.YES_NO,
    yesNoOptions: [
      { value: YesNoValue.YES, label: 'Yes' },
      { value: YesNoValue.NO, label: 'No' },
    ],
  },
  {
    id: 'awareness_campaigns_difference',
    text: 'Do you believe awareness campaigns can make a real difference?',
    type: QuestionType.YES_NO,
    yesNoOptions: [
      { value: YesNoValue.YES, label: 'Yes' },
      { value: YesNoValue.NO, label: 'No' },
    ],
  },

  // Optional Open Question
  {
    id: 'own_experience',
    text: 'Write us more about your own experience (optional)',
    type: QuestionType.OPEN,
  },
];
