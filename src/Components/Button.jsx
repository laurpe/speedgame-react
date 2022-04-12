import styles from "./Button.module.css";

const Button = ({ handleClick, title }) => {
    return (
        <button type="button" styles={styles.button} onClick={handleClick}>
            {title}
        </button>
    );
};

export default Button;
