import styles from "./Popup.module.css";

const Popup = ({ score, handleClick }) => {
    return (
        <div className={styles.popup}>
            <p>Your score was: {score}</p>
            <button type="button" onClick={handleClick}>
                Close
            </button>
        </div>
    );
};

export default Popup;
