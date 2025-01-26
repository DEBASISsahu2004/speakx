import styles from './app.module.css';
import { useState } from 'react';
import MCQ from './components/mcq/MCQ';
import Anagram from './components/anagram/Anagram';
import Search from './assets/search.svg';
import ReadAlong from './components/readalong/ReadAlong';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);

  const handleSubmit = async (e, newPage = page) => {
    e.preventDefault();
    const query = e.target.question.value;
    const response = await fetch(`${API_BASE_URL}/questions?query=${query}&page=${newPage}&limit=10`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setQuestions(data);
    console.log(data);
  };

  const handleNext = () => {
    setPage((prev) => {
      const newPage = prev + 1;
      handleSubmit({ preventDefault: () => { }, target: { question: { value: document.querySelector('input[name="question"]').value } } }, newPage);
      return newPage;
    });
  };

  const handlePrev = () => {
    setPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      handleSubmit({ preventDefault: () => { }, target: { question: { value: document.querySelector('input[name="question"]').value } } }, newPage);
      return newPage;
    });
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input type="text" name="question" placeholder="Enter Question" />
        <button type="submit"><img src={Search} alt="search" /></button>
      </form>

      {questions.length > 0 ? (
        <div className={styles.questionsContainer}>
          <div className={styles.allQuestions}>
            {questions.map((question, index) => {
              if (question.type === 'MCQ') {
                return <MCQ key={index} question={question} />;
              } else if (question.type === 'ANAGRAM') {
                return <Anagram key={index} question={question} />;
              } else {
                return <ReadAlong key={index} question={question} />
              }
            }
            )}
          </div>

          <div className={styles.pagination}>
            <button type="button" onClick={handlePrev} disabled={page === 1}>Previous</button>
            <button type="button" onClick={handleNext} disabled={questions.length < 10}>Next</button>
          </div>
        </div>
      ) : (
        <div className={styles.noQuestions}>
          <h2>No questions found</h2>
        </div>
      )}
    </>
  );
}

export default App;
