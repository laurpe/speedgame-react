import styles from "./Popup.module.css";

const Popup = ({ score, handleClick }) => {
    let message = "";
    if (score >= 40) {
        message = "Amazing!";
    } else if (score >= 25) {
        message = "Great job!";
    } else if (score >= 5) {
        message = "Nice work!";
    } else {
        message = "Try a bit harder next time!";
    }

    return (
        <div className={styles.popup}>
            <p>Your score was: {score}</p>
            <p>{message}</p>
            <button type="button" className={styles.btn} onClick={handleClick}>
                Close
            </button>
        </div>
    );
};

export default Popup;
