import styles from "./Score.module.css";

const Score = ({ score }) => {
    return <div styles={styles.score}>Your score: {score}</div>;
};

export default Score;
