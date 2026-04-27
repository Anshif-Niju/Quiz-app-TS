import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QuizProvider } from './context/quizContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuizProvider>
    <App />
    </QuizProvider>
  </StrictMode>,
)
