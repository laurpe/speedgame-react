import styles from "./Circle.module.css";

const Circle = ({ circle, handleClickCircle }) => {
    return (
        <div>
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
                ></button>
            )}
        </div>
    );
};

export default Circle;
