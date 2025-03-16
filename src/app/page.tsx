import { questions } from './data/questions';
import Quiz from './components/Quiz';
import { Header } from '@/components/header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <Quiz questions={questions} />
        </div>
      </main>
      
      <footer className="border-t py-6 bg-muted/40">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vaarbewijs Quiz - Oefen voor je Klein Vaarbewijs examen</p>
        </div>
      </footer>
    </div>
  );
}
