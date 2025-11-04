export enum QuestionType {
  SCALABLE = 'SCALABLE',
  ESSAY = 'ESSAY',
  YES_NO = 'YES_NO',
  OPEN = 'OPEN',
}

export enum ScalableValue {
  NOT_AT_ALL = '1',
  A_LITTLE = '2',
  MODERATELY = '3',
  VERY = '4',
  EXTREMELY = '5',
}

export enum YesNoValue {
  YES = 'Yes',
  NO = 'No',
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  scaleOptions?: { value: ScalableValue; label: string }[];
  yesNoOptions?: { value: YesNoValue; label: string }[];
}

export type SurveyAnswers = {
  [key: string]: string | ScalableValue | YesNoValue | undefined;
};

export interface GroundingChunkWeb {
  web: {
    uri: string;
    title: string;
  };
}

export interface GroundingChunkMaps {
  maps: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        text: string;
      }[];
    }[];
  };
}

export type GroundingChunk = GroundingChunkWeb | GroundingChunkMaps;

export interface GeminiResponseData {
  text: string;
  groundingChunks: GroundingChunk[] | undefined;
}
