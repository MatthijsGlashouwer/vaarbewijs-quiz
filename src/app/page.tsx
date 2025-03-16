import { questions } from './data/questions';
import Quiz from './components/Quiz';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Vaarbewijs Quiz</h1>
          <p className="text-sm opacity-80">Oefenen voor je Klein Vaarbewijs 1</p>
        </div>
      </header>
      
      <main className="py-8">
        <Quiz questions={questions} />
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Vaarbewijs Quiz - Oefen voor je Klein Vaarbewijs examen</p>
        </div>
      </footer>
    </div>
  );
}
