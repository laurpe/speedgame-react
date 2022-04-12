import styles from "./Score.module.css";

const Score = ({ score }) => {
    return <div className={styles.score}>Your score: {score}</div>;
};

export default Score;
