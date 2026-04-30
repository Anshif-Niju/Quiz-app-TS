import { useEffect, type ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  advanceQuestion,
  checkAnswer,
  restartQuiz as restartQuizAction,
  selectOption as selectOptionAction,
  selectQuizState,
  tick,
  type AppDispatch,
} from '../store/quizStore';

interface QuizHookType {
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

export const QuizEffects = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, timeLeft } = useSelector(selectQuizState);

  useEffect(() => {
    if (status !== 'idle') {
      return;
    }

    if (timeLeft === 0) {
      dispatch(checkAnswer());
      return;
    }

    const timer = window.setTimeout(() => {
      dispatch(tick());
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [dispatch, status, timeLeft]);

  useEffect(() => {
    if (status !== 'checking') {
      return;
    }

    const nextQuestionTimer = window.setTimeout(() => {
      dispatch(advanceQuestion());
    }, 3000);

    return () => window.clearTimeout(nextQuestionTimer);
  }, [dispatch, status]);

  return <>{children}</>;
};

export const useQuiz = (): QuizHookType => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentIndex, score, userOption, correctAnswerIndex, status, timeLeft } =
    useSelector(selectQuizState);

  return {
    currentIndex,
    score,
    userOption,
    correctAnswerIndex,
    status,
    timeLeft,
    selectOption: (index: number) => {
      dispatch(selectOptionAction(index));
    },
    submitAnswer: () => {
      dispatch(checkAnswer());
    },
    restartQuiz: () => {
      dispatch(restartQuizAction());
    },
  };
};
