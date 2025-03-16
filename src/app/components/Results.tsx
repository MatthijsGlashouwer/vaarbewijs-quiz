'use client';

import { Question } from '../data/questions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, RotateCcw, Eye } from 'lucide-react';

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
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Resultaten Oefenexamen</CardTitle>
        <CardDescription>
          {isPassed ? 'Gefeliciteerd met je resultaat!' : 'Je hebt het net niet gehaald, probeer het nog eens.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-36 h-36 rounded-full flex items-center justify-center border-8 border-primary/20 relative">
              <div 
                className="absolute inset-0 rounded-full border-8 border-transparent"
                style={{ 
                  background: `conic-gradient(${isPassed ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} ${score}%, transparent 0)`,
                  maskImage: 'radial-gradient(transparent 55%, black 56%)',
                  WebkitMaskImage: 'radial-gradient(transparent 55%, black 56%)'
                }}
              />
              <span className="text-4xl font-bold">{score}%</span>
            </div>
            {isPassed ? (
              <CheckCircle className="absolute bottom-0 right-0 h-10 w-10 text-green-500 bg-background p-1 rounded-full" />
            ) : (
              <XCircle className="absolute bottom-0 right-0 h-10 w-10 text-red-500 bg-background p-1 rounded-full" />
            )}
          </div>
          
          <h3 className={cn(
            "text-2xl font-bold",
            isPassed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {isPassed ? 'Geslaagd!' : 'Helaas, niet geslaagd'}
          </h3>
          
          <p className="text-muted-foreground mt-2">
            Je hebt {correctAnswers} van de {totalQuestions} vragen goed beantwoord.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Resultaten per categorie</h3>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <div key={stat.category} className="border rounded-lg p-4 bg-card">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{stat.category}</span>
                  <span className={cn(
                    "font-mono",
                    stat.percentage >= 68 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {stat.correct}/{stat.total} ({stat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      stat.percentage >= 68 ? "bg-green-500" : "bg-red-500"
                    )}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onReview}
          className="w-full sm:w-auto"
        >
          <Eye className="mr-2 h-4 w-4" />
          Bekijk antwoorden
        </Button>
        <Button
          onClick={onRestart}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Opnieuw starten
        </Button>
      </CardFooter>
    </Card>
  );
} 