'use client';

import { Option, Question as QuestionType } from '../data/questions';
import { useState } from 'react';
import Image from 'next/image';
import FallbackImage from './FallbackImage';
import AnimatedImage from './AnimatedImage';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

// Import the AnimationConfig type from AnimatedImage
type AnimationType = 'vessel-movement' | 'signal-flash' | 'water-flow' | 'path-trace' | 'none';

interface AnimationConfig {
  type: AnimationType;
  duration?: number;
  loop?: boolean;
  delay?: number;
}

// Define animation mappings based on image content
const getAnimationConfig = (src: string): AnimationConfig => {
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
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-8 w-8 shrink-0">{question.id}</span>
          {question.text}
        </CardTitle>
        <CardDescription>{question.category}</CardDescription>
      </CardHeader>
      
      {question.image && (
        <CardContent className="flex justify-center pb-2">
          <div className="overflow-hidden rounded-xl border bg-muted/20">
            {useAnimatedImage ? (
              <AnimatedImage
                src={question.image.src}
                alt={question.image.alt}
                width={question.image.width || 500}
                height={question.image.height || 375}
                animation={getAnimationConfig(question.image.src)}
                category={question.category}
              />
            ) : !imageError ? (
              <div className="relative">
                <Image
                  src={question.image.src}
                  alt={question.image.alt}
                  width={question.image.width || 500}
                  height={question.image.height || 375}
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <FallbackImage 
                category={question.category}
                alt={question.image.alt}
                width={question.image.width}
                height={question.image.height}
              />
            )}
          </div>
        </CardContent>
      )}
      
      <CardContent>
        <RadioGroup
          value={selectedOption}
          onValueChange={!showExplanation ? handleOptionSelect : undefined}
          className="space-y-3"
        >
          {question.options.map((option: Option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === question.correctOptionId;
            const isIncorrectSelection = isSelected && !isCorrectOption && showExplanation;
            const isCorrectSelection = isSelected && isCorrectOption && showExplanation;
            
            return (
              <div
                key={option.id}
                className={cn(
                  "flex items-start space-x-2 rounded-md border p-3 transition-colors",
                  isSelected && !showExplanation && "border-primary bg-primary/5",
                  isCorrectSelection && "border-green-500 bg-green-50 dark:bg-green-950/20",
                  isIncorrectSelection && "border-red-500 bg-red-50 dark:bg-red-950/20",
                  !isSelected && showExplanation && isCorrectOption && "border-green-500 bg-green-50/50 dark:bg-green-950/10",
                  !showExplanation && "cursor-pointer hover:bg-muted/60"
                )}
              >
                <RadioGroupItem
                  value={option.id}
                  id={`option-${question.id}-${option.id}`}
                  disabled={showExplanation}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={`option-${question.id}-${option.id}`}
                    className={cn(
                      "text-base font-medium cursor-pointer",
                      isCorrectSelection && "text-green-700 dark:text-green-300",
                      isIncorrectSelection && "text-red-700 dark:text-red-300"
                    )}
                  >
                    <div className="flex items-start">
                      <span className="flex items-center justify-center rounded-full border h-6 w-6 mr-2 shrink-0">
                        {option.id}
                      </span>
                      <span className="pt-0.5">{option.text}</span>
                      
                      {showExplanation && isCorrectOption && (
                        <CheckCircle className="ml-auto h-5 w-5 text-green-500 shrink-0" />
                      )}
                      
                      {showExplanation && isIncorrectSelection && (
                        <XCircle className="ml-auto h-5 w-5 text-red-500 shrink-0" />
                      )}
                    </div>
                  </Label>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
      
      {showExplanation && (
        <CardFooter>
          <div className={cn(
            "w-full p-4 rounded-md text-sm",
            isCorrect 
              ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900"
              : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
          )}>
            <p className="font-medium mb-1">
              {isCorrect ? 'Correct antwoord!' : 'Helaas, dat is niet correct.'}
            </p>
            <p>{question.explanation}</p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
} 