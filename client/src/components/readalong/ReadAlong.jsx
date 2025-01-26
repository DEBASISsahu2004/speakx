import styles from './readalong.module.css';
import PropTypes from 'prop-types';

const ReadAlong = ({ question }) => {
    return (
        <div className={styles.readalongContainer}>
            <h3 className={styles.questionTitle}>Read the sentence</h3>
            <p className={styles.readsentence}>{question.title}</p>
        </div>
    )
};

ReadAlong.propTypes = {
    question: PropTypes.object.isRequired,
};

export default ReadAlong