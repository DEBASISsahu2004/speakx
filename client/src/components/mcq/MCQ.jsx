import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './mcq.module.css';

const MCQ = ({ question }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsCorrect(option.isCorrectAnswer);
    };

    return (
        <div className={styles.mcqContainer}>
            <h3 className={styles.questionTitle}>{question.title}</h3>
            <ul className={styles.options}>
                {question.options.map((option, index) => (
                    <li
                        key={index}
                        className={`${styles.option} ${selectedOption === option ? (isCorrect ? styles.correct : styles.incorrect) : ''}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

MCQ.propTypes = {
    question: PropTypes.object.isRequired,
};

export default MCQ;