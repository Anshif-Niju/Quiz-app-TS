import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { quizQuestion } from '../data';

export type QuizStatus = 'idle' | 'checking' | 'finished';

export interface QuizState {
  currentIndex: number;
  score: number;
  userOption: number | null;
  correctAnswerIndex: number | null;
  status: QuizStatus;
  timeLeft: number;
}

const QUESTION_TIME_LIMIT = 10;

const initialState: QuizState = {
  currentIndex: 0,
  score: 0,
  userOption: null,
  correctAnswerIndex: null,
  status: 'idle',
  timeLeft: QUESTION_TIME_LIMIT,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    selectOption(state, action: PayloadAction<number>) {
      if (state.status === 'idle') {
        state.userOption = action.payload;
      }
    },
    checkAnswer(state) {
      if (state.status !== 'idle') {
        return;
      }

      const correctIdx = quizQuestion[state.currentIndex].correctAnswer;
      state.correctAnswerIndex = correctIdx;
      state.status = 'checking';

      if (state.userOption === correctIdx) {
        state.score += 1;
      }
    },
    advanceQuestion(state) {
      if (state.currentIndex + 1 < quizQuestion.length) {
        state.currentIndex += 1;
        state.userOption = null;
        state.correctAnswerIndex = null;
        state.status = 'idle';
        state.timeLeft = QUESTION_TIME_LIMIT;
        return;
      }

      state.status = 'finished';
    },
    tick(state) {
      if (state.status === 'idle' && state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    restartQuiz() {
      return { ...initialState };
    },
  },
});

export const { advanceQuestion, checkAnswer, restartQuiz, selectOption, tick } =
  quizSlice.actions;

export const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectQuizState = (state: RootState) => state.quiz;
