import PropTypes from 'prop-types';
import styles from './anagram.module.css';
import { useState } from 'react';

const Anagram = ({ question }) => {
    const [submittedText, setSubmittedText] = useState("");
    const [clickedBlocks, setClickedBlocks] = useState([]);
    const [result, setResult] = useState('');

    const handleBlockClick = (event, blockText) => {
        const isClicked = clickedBlocks.includes(blockText);
        if (isClicked) {
            setSubmittedText((prev) => prev.replace(question.anagramType === "SENTENCE" ? ` ${blockText}` : blockText, ''));
            setClickedBlocks((prev) => prev.filter((text) => text !== blockText));
        } else {
            setSubmittedText((prev) => question.anagramType === "SENTENCE" ? prev + " " + blockText : prev + blockText);
            setClickedBlocks((prev) => [...prev, blockText]);
        }
        event.target.classList.toggle(styles.clicked);
    };

    const checkAnswer = () => {
        if (submittedText.trim() === question.solution) {
            setResult('Correct');
        } else {
            setResult('Incorrect');
        }
    };

    const resetAnswer = () => {
        setSubmittedText("");
        setClickedBlocks([]);
        setResult('');
        document.querySelectorAll(`.${styles.clicked}`).forEach((element) => {
            element.classList.remove(styles.clicked);
        });
    };

    return (
        <div className={styles.anagramContainer}>
            <h3 className={styles.questionTitle}>{question.title}</h3>
            <ul className={styles.blocks}>
                {question.blocks.map((block, index) => (
                    <li key={index} className={styles.block} onClick={(event) => handleBlockClick(event, block.text)}>
                        {block.text}
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={resetAnswer}>reset</button>
                <button onClick={checkAnswer}>check</button>
            </div>
            {result && <p className={styles[result === 'Correct' ? 'correct' : 'incorrect']}>{result}</p>}
        </div>
    );
};

Anagram.propTypes = {
    question: PropTypes.object.isRequired,
};

export default Anagram;