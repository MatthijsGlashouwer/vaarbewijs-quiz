'use client';

import { useState, useEffect } from 'react';
import { Question as QuestionType } from '../data/questions';
import Question from './Question';
import Results from './Results';

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
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md my-12">
        <h2 className="text-xl font-bold mb-4">Voortgang gevonden</h2>
        <p className="mb-4">
          Je hebt een eerdere quiz-sessie met {answeredQuestionsCount} beantwoorde vragen. 
          Wil je verdergaan waar je gebleven was?
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setHasStoredProgress(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Doorgaan
          </button>
          <button
            onClick={restartQuiz}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Nieuwe quiz starten
          </button>
        </div>
      </div>
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-blue-50 p-4 rounded-lg mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Oefenexamen Klein Vaarbewijs 1</h2>
          <p className="text-sm text-gray-600">
            {userAnswers && Object.keys(userAnswers).length} van {questions.length} vragen beantwoord
          </p>
        </div>
        
        <div className="flex items-center mt-4 sm:mt-0">
          <div className={`mr-2 text-lg font-medium quiz-timer ${timer < 300 ? 'text-red-600 animate-pulse' : 'text-gray-800'}`}>
            {formatTime(timer)}
          </div>
          {quizState === 'quiz' && (
            <button
              onClick={submitQuiz}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
            >
              Inleveren
            </button>
          )}
          {quizState === 'review' && (
            <button
              onClick={() => setQuizState('results')}
              className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
            >
              Terug naar resultaten
            </button>
          )}
        </div>
      </div>
      
      <div className="mb-6 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <Question
        question={currentQuestion}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestion.id]}
        showExplanation={quizState === 'review'}
      />
      
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={isFirstQuestion}
          className={`px-6 py-2 rounded-md font-medium ${
            isFirstQuestion
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          Vorige
        </button>
        
        <button
          onClick={clearProgress}
          className="px-6 py-2 rounded-md font-medium text-red-600 hover:bg-red-50 border border-red-200"
        >
          Voortgang wissen
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={isLastQuestion}
          className={`px-6 py-2 rounded-md font-medium ${
            isLastQuestion
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Volgende
        </button>
      </div>
      
      <div className="mt-8 grid grid-cols-5 sm:grid-cols-10 gap-2">
        {questions.map((question, index) => (
          <button
            key={question.id}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`w-full aspect-square rounded-md flex items-center justify-center font-medium ${
              index === currentQuestionIndex
                ? 'bg-blue-500 text-white'
                : userAnswers[question.id]
                  ? userAnswers[question.id] === question.correctOptionId && quizState === 'review'
                    ? 'bg-green-100 text-green-800'
                    : userAnswers[question.id] !== question.correctOptionId && quizState === 'review'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {question.id}
          </button>
        ))}
      </div>
    </div>
  );
} 