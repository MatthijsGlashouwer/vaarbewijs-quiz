'use client';

import { useState, useEffect } from 'react';
import { Question as QuestionType } from '../data/questions';
import Question from './Question';
import Results from './Results';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Clock, AlertCircle, ArrowLeft, ArrowRight, Trash2, CheckCircle, ListChecks } from 'lucide-react';

interface QuizProps {
  questions: QuestionType[];
}

// Define a storage key for localStorage
const STORAGE_KEY = 'vaarbewijs_quiz_progress';

// Define the data structure for what we'll store in localStorage
interface StoredProgress {
  userAnswers: Record<number, string>;
  remainingTime: number;
  currentQuestionIndex: number;
  quizState: 'quiz' | 'results' | 'review';
  lastUpdated: number; // Timestamp to track when the progress was last saved
}

export default function Quiz({ questions }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizState, setQuizState] = useState<'quiz' | 'results' | 'review'>('quiz');
  const [timer, setTimer] = useState<number>(45 * 60); // 45 minutes in seconds
  const [hasStoredProgress, setHasStoredProgress] = useState(false);
  
  // Load stored progress when the component mounts
  useEffect(() => {
    const loadProgress = () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          const progress: StoredProgress = JSON.parse(storedData);
          
          // Check if stored data is from the same set of questions (simple check)
          const validProgress = questions.length > 0 && 
            Object.keys(progress.userAnswers).every(
              key => questions.some(q => q.id === parseInt(key))
            );
          
          if (validProgress) {
            setUserAnswers(progress.userAnswers);
            setCurrentQuestionIndex(progress.currentQuestionIndex);
            setQuizState(progress.quizState);
            setTimer(progress.remainingTime);
            setHasStoredProgress(true);
            return true;
          }
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
      return false;
    };

    loadProgress();
  }, [questions]);
  
  // Save progress effect
  useEffect(() => {
    const saveProgress = () => {
      // Don't save if the quiz is complete
      if (quizState === 'results' && 
          Object.keys(userAnswers).length === questions.length) {
        return;
      }
      
      const progress: StoredProgress = {
        userAnswers,
        remainingTime: timer,
        currentQuestionIndex,
        quizState,
        lastUpdated: Date.now(),
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    };
    
    // Save whenever state changes
    saveProgress();
    
    // Also save on window unload
    window.addEventListener('beforeunload', saveProgress);
    return () => {
      window.removeEventListener('beforeunload', saveProgress);
    };
  }, [userAnswers, timer, currentQuestionIndex, quizState, questions.length]);
  
  // Timer effect
  useEffect(() => {
    if (quizState !== 'quiz' || timer <= 0) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Submit quiz automatically when time is up
          clearInterval(interval);
          setQuizState('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [quizState, timer]);
  
  const handleAnswer = (questionId: number, selectedOptionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOptionId,
    }));
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };
  
  const submitQuiz = () => {
    setQuizState('results');
  };
  
  const restartQuiz = () => {
    // Clear localStorage on restart
    localStorage.removeItem(STORAGE_KEY);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setQuizState('quiz');
    setTimer(45 * 60); // Reset timer to 45 minutes
    setHasStoredProgress(false);
  };
  
  const clearProgress = () => {
    if (window.confirm('Weet je zeker dat je je voortgang wilt wissen? Dit kan niet ongedaan gemaakt worden.')) {
      restartQuiz();
    }
  };
  
  const reviewAnswers = () => {
    setQuizState('review');
    setCurrentQuestionIndex(0);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredQuestionsCount = Object.keys(userAnswers).length;

  // Show the resume prompt if there's saved progress
  if (hasStoredProgress && quizState === 'quiz' && answeredQuestionsCount > 0) {
    return (
      <Card className="max-w-md mx-auto my-12">
        <CardHeader>
          <CardTitle>Voortgang gevonden</CardTitle>
          <CardDescription>Je kunt verder gaan waar je gebleven was</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Je hebt een eerdere quiz-sessie met <strong>{answeredQuestionsCount}</strong> beantwoorde vragen.
            Wil je verdergaan waar je gebleven was?
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            onClick={restartQuiz}
            variant="outline"
          >
            Nieuwe quiz starten
          </Button>
          <Button
            onClick={() => setHasStoredProgress(false)}
          >
            Doorgaan
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (quizState === 'results') {
    return (
      <Results
        questions={questions}
        userAnswers={userAnswers}
        onRestart={restartQuiz}
        onReview={reviewAnswers}
      />
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Oefenexamen Klein Vaarbewijs 1</CardTitle>
              <CardDescription>
                {userAnswers && Object.keys(userAnswers).length} van {questions.length} vragen beantwoord
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex items-center font-mono text-lg",
                timer < 300 && "text-red-500 dark:text-red-400 animate-pulse"
              )}>
                <Clock className="mr-2 h-5 w-5" />
                {formatTime(timer)}
              </div>
              
              {quizState === 'quiz' && (
                <Button
                  onClick={submitQuiz}
                  variant="default"
                  size="sm"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Inleveren
                </Button>
              )}
              
              {quizState === 'review' && (
                <Button
                  onClick={() => setQuizState('results')}
                  variant="default"
                  size="sm"
                >
                  <ListChecks className="mr-2 h-4 w-4" />
                  Terug naar resultaten
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <div className="px-6">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <CardContent className="pt-6">
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            userAnswer={userAnswers[currentQuestion.id]}
            showExplanation={quizState === 'review'}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            onClick={prevQuestion}
            disabled={isFirstQuestion}
            variant="outline"
            className={isFirstQuestion ? "opacity-50" : ""}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Vorige
          </Button>
          
          <Button
            onClick={clearProgress}
            variant="ghost"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Voortgang wissen
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={isLastQuestion}
            variant={isLastQuestion ? "outline" : "default"}
            className={isLastQuestion ? "opacity-50" : ""}
          >
            Volgende
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-2 mb-8">
        {questions.map((question, index) => {
          const isAnswered = !!userAnswers[question.id];
          const isCurrentQuestion = index === currentQuestionIndex;
          const isCorrect = userAnswers[question.id] === question.correctOptionId && quizState === 'review';
          const isIncorrect = userAnswers[question.id] !== question.correctOptionId && isAnswered && quizState === 'review';
          
          return (
            <Button
              key={question.id}
              onClick={() => setCurrentQuestionIndex(index)}
              variant={isCurrentQuestion ? "default" : "outline"}
              size="icon"
              className={cn(
                "aspect-square text-base font-medium transition-all h-10 w-10 p-0",
                isCurrentQuestion && "ring-2 ring-primary ring-offset-2",
                isAnswered && !isCurrentQuestion && !isCorrect && !isIncorrect && "bg-primary/10 text-primary hover:bg-primary/20",
                isCorrect && "bg-green-100 text-green-800 border-green-400 hover:bg-green-200 dark:bg-green-950/40 dark:text-green-400",
                isIncorrect && "bg-red-100 text-red-800 border-red-400 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400"
              )}
            >
              {question.id}
            </Button>
          );
        })}
      </div>
    </div>
  );
} 