'use client';

import { Option, Question as QuestionType } from '../data/questions';
import { useState } from 'react';
import Image from 'next/image';
import FallbackImage from './FallbackImage';
import AnimatedImage from './AnimatedImage';

// Import the AnimationConfig type from AnimatedImage
type AnimationType = 'vessel-movement' | 'signal-flash' | 'water-flow' | 'path-trace' | 'none';

interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  loop?: boolean;
  delay?: number;
}

// Define animation mappings based on image content
const getAnimationConfig = (src: string, category: string): AnimationConfig => {
  if (src.includes('blauw-bord')) {
    return { type: 'signal-flash', duration: 1.5, loop: true };
  } else if (src.includes('hoofdvaarweg')) {
    return { type: 'path-trace', duration: 3, loop: false };
  } else if (src.includes('doorvaart-verboden') || src.includes('groene-lichten')) {
    return { type: 'signal-flash', duration: 2, loop: true };
  } else if (src.includes('water') || src.includes('vaarweg')) {
    return { type: 'water-flow', duration: 3, loop: true };
  } else if (src.includes('schip') || src.includes('vessel')) {
    return { type: 'vessel-movement', duration: 4, loop: true };
  }
  
  // Default case - if image doesn't match specific criteria, use path-trace for SVGs or none for other formats
  return src.endsWith('.svg') ? { type: 'path-trace', duration: 4, loop: false } : { type: 'none' };
};

interface QuestionProps {
  question: QuestionType;
  onAnswer: (questionId: number, selectedOptionId: string) => void;
  userAnswer?: string;
  showExplanation: boolean;
}

export default function Question({ question, onAnswer, userAnswer, showExplanation }: QuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(userAnswer);
  const [imageError, setImageError] = useState(false);
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    onAnswer(question.id, optionId);
  };

  const isCorrect = userAnswer === question.correctOptionId;

  // Determine if image should be animated
  const useAnimatedImage = question.image && question.image.src.endsWith('.svg');

  return (
    <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">{question.id}. {question.text}</h3>
      
      <div className="mb-6 flex justify-center">
        {question.image && useAnimatedImage ? (
          <AnimatedImage
            src={question.image.src}
            alt={question.image.alt}
            width={question.image.width || 400}
            height={question.image.height || 300}
            animation={getAnimationConfig(question.image.src, question.category)}
            category={question.category}
          />
        ) : question.image && !imageError ? (
          <div className="relative rounded-lg overflow-hidden shadow-md">
            <Image
              src={question.image.src}
              alt={question.image.alt}
              width={question.image.width || 400}
              height={question.image.height || 300}
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        ) : question.image ? (
          <FallbackImage 
            category={question.category}
            alt={question.image.alt}
            width={question.image.width}
            height={question.image.height}
          />
        ) : null}
      </div>
      
      <div className="space-y-3">
        {question.options.map((option: Option) => (
          <div 
            key={option.id}
            className={`p-3 rounded-md cursor-pointer border ${
              selectedOption === option.id 
                ? selectedOption === question.correctOptionId && showExplanation
                  ? 'bg-green-100 border-green-400'
                  : selectedOption !== question.correctOptionId && showExplanation
                    ? 'bg-red-100 border-red-400'
                    : 'bg-blue-100 border-blue-400'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            } transition-colors`}
            onClick={() => !showExplanation && handleOptionSelect(option.id)}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                selectedOption === option.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}>
                {option.id}
              </div>
              <span>{option.text}</span>
              
              {showExplanation && option.id === question.correctOptionId && (
                <div className="ml-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {showExplanation && (
        <div className={`mt-4 p-4 rounded-md ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <p className="font-medium mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
} 