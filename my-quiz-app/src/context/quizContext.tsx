import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { quizQuestion } from '../data';

interface QuizContextType {
  currentIndex: number;
  score: number;
  userOption: number | null;
  correctAnswerIndex: number | null;
  status: 'idle' | 'checking' | 'finished';
  timeLeft: number;
  selectOption: (index: number) => void;
  submitAnswer: () => void;
  restartQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userOption, setUserOption] = useState<number | null>(null);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'checking' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question

  const nextQuestion = () => {
    if (currentIndex + 1 < quizQuestion.length) {
      setCurrentIndex((prev) => prev + 1);
      setUserOption(null);
      setCorrectAnswerIndex(null);
      setStatus('idle');
      setTimeLeft(10);
    } else {
      setStatus('finished');
    }
  };


  useEffect(() => {
    if (status === 'finished' || status === 'checking') return;

    if (timeLeft === 0) {
      submitAnswer(); 
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, status]);

  const selectOption = (index: number) => {
    if (status === 'idle') setUserOption(index);
  };

  const submitAnswer = () => {
    if (status !== 'idle') return;

    const correctIdx = quizQuestion[currentIndex].correctAnswer;
    setCorrectAnswerIndex(correctIdx);
    setStatus('checking');

    if (userOption === correctIdx) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserOption(null);
    setCorrectAnswerIndex(null);
    setStatus('idle');
    setTimeLeft(10);
  };

  return (
    <QuizContext.Provider value={{
      currentIndex, score, userOption, correctAnswerIndex, 
      status, timeLeft, selectOption, submitAnswer, restartQuiz 
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
};