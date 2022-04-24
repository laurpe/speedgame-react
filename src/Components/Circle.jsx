import styles from "./Circle.module.css";

const Circle = ({ circle, handleClickCircle, gameOn, circles }) => {
    return (
        <div>
            {circle && (
                <button
                    className={`${styles.circle} ${styles.active}`}
                    onClick={() => handleClickCircle(circle)}
                ></button>
            )}
            {!circle && (
                <button
                    className={styles.circle}
                    onClick={() => handleClickCircle(circle)}
                    disabled={!gameOn ? true : false}
                ></button>
            )}
        </div>
    );
};

export default Circle;
