import { useQuiz } from '../context/quizContext';
import { quizQuestion } from '../data';
import './Quiz.css';

function Quiz() {
  const { 
    currentIndex, userOption, correctAnswerIndex, 
    status, timeLeft, score, selectOption, submitAnswer, restartQuiz 
  } = useQuiz();

  if (status === 'finished') {
    return (
      <div className="quiz-container">
        <h1>Results</h1>
        <p>Score: {score} / {quizQuestion.length}</p>
        <button onClick={restartQuiz}>Try Again</button>
      </div>
    );
  }

  const currentQ = quizQuestion[currentIndex];

  return (
    <div className="quiz-container">

      <div className="timer-container">
        <div className="timer-bar" style={{ width: `${(timeLeft / 10) * 100}%` }} />
      </div>

      <h3>Question {currentIndex + 1} / {quizQuestion.length}</h3>
      <p>Score: {score}</p>
      <h1 style={{color:'white'}}>{currentQ.text}</h1>

      <div className="options-list">
        {currentQ.options.map((option: string, index: number) => {
          let btnClass = "";
          
          if (userOption === index) btnClass = "blue"; 
          if (status === 'checking') {
            if (index === correctAnswerIndex) btnClass = "green"; 
            if (userOption === index && userOption !== correctAnswerIndex) btnClass = "red"; 
          }

          return (
            <button 
              key={index} 
              className={btnClass} 
              onClick={() => selectOption(index)}
              disabled={status === 'checking'}
            >
              {option}
            </button>
          );
        })}
      </div>

      <button 
        className="submit-btn" // CSS അപ്ലൈ ചെയ്യാൻ ക്ലാസ് നൽകി
        onClick={submitAnswer} 
        disabled={userOption === null || status === 'checking'}
      >
        {status === 'checking' ? 'Checking...' : 'Submit'}
      </button>
    </div>
  );
}

export default Quiz;