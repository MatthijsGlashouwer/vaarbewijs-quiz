'use client';

import { Question } from '../data/questions';

interface ResultsProps {
  questions: Question[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
  onReview: () => void;
}

export default function Results({ questions, userAnswers, onRestart, onReview }: ResultsProps) {
  const totalQuestions = questions.length;
  
  const correctAnswers = questions.filter(
    (question) => userAnswers[question.id] === question.correctOptionId
  ).length;
  
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const isPassed = score >= 68; // 68% passing threshold per the requirements

  const getCategoryStats = () => {
    const categories: Record<string, { total: number; correct: number }> = {};
    
    questions.forEach(question => {
      if (!categories[question.category]) {
        categories[question.category] = { total: 0, correct: 0 };
      }
      
      categories[question.category].total += 1;
      
      if (userAnswers[question.id] === question.correctOptionId) {
        categories[question.category].correct += 1;
      }
    });
    
    return Object.entries(categories).map(([category, stats]) => ({
      category,
      total: stats.total,
      correct: stats.correct,
      percentage: Math.round((stats.correct / stats.total) * 100)
    }));
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Resultaten Oefenexamen</h2>
      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-blue-500 mb-4">
          <span className="text-4xl font-bold text-blue-600">{score}%</span>
        </div>
        
        <h3 className={`text-2xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
          {isPassed ? 'Geslaagd!' : 'Helaas, niet geslaagd'}
        </h3>
        
        <p className="text-gray-600 mt-2">
          Je hebt {correctAnswers} van de {totalQuestions} vragen goed beantwoord.
        </p>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Resultaten per categorie</h3>
        <div className="space-y-3">
          {categoryStats.map((stat) => (
            <div key={stat.category} className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{stat.category}</span>
                <span>{stat.correct}/{stat.total} ({stat.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${stat.percentage >= 68 ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onReview}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Bekijk antwoorden
        </button>
        <button
          onClick={onRestart}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
        >
          Opnieuw starten
        </button>
      </div>
    </div>
  );
} 