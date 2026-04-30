import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { QuizEffects } from './hooks/useQuiz';
import { store } from './store/quizStore';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QuizEffects>
        <App/>
      </QuizEffects>
    </Provider>
  </StrictMode>,
);
