import React from 'react';
import { Question, QuestionType, ScalableValue, YesNoValue } from '../types';

interface SurveyQuestionProps {
  question: Question;
  value: string | ScalableValue | YesNoValue | undefined;
  onChange: (questionId: string, value: string | ScalableValue | YesNoValue) => void;
}

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ question, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(question.id, e.target.value as ScalableValue | YesNoValue | string);
  };

  const renderInput = () => {
    switch (question.type) {
      case QuestionType.SCALABLE:
        return (
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 justify-center sm:justify-start">
            {question.scaleOptions?.map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transform transition-transform duration-200 ease-out
                            ${value === option.value ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-gray-700 text-gray-200 hover:bg-gray-600 scale-100'}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-indigo-500 border-gray-500 focus:ring-indigo-500"
                />
                <span className="text-sm sm:text-base">{option.label}</span>
              </label>
            ))}
          </div>
        );
      case QuestionType.ESSAY:
      case QuestionType.OPEN:
        return (
          <textarea
            id={question.id}
            name={question.id}
            value={value as string || ''}
            onChange={handleChange}
            rows={question.type === QuestionType.ESSAY ? 4 : 6}
            className="mt-2 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 bg-gray-700 text-gray-100"
            placeholder="Type your answer here..."
          ></textarea>
        );
      case QuestionType.YES_NO:
        return (
          <div className="flex gap-4 mt-2">
            {question.yesNoOptions?.map((option) => (
              <label
                key={option.value}
                className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transform transition-transform duration-200 ease-out
                            ${value === option.value ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-gray-700 text-gray-200 hover:bg-gray-600 scale-100'}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-indigo-500 border-gray-500 focus:ring-indigo-500"
                />
                <span className="text-sm sm:text-base">{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      <label htmlFor={question.id} className="block text-lg font-medium text-gray-100 mb-2">
        {question.text}
      </label>
      {renderInput()}
    </div>
  );
};

export default SurveyQuestion;