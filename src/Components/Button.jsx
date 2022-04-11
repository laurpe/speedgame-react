import styles from "./Button.module.css";

const Button = ({ handleClick, title }) => {
    return (
        <button className={styles.button} type="button" onClick={handleClick}>
            {title}
        </button>
    );
};

export default Button;
