import styles from "./Circle.module.css";

const Circle = ({ circle, handleClickCircle, gameOn }) => {
    return (
        <div className={styles.circleDiv}>
            {circle && (
                <button
                    className={styles.circleActive}
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
