import styles from "./Circle.module.css";

const Circle = ({ circle }) => {
    return (
        <div>
            {circle && <button className={styles.circleActive}></button>}
            {!circle && <button className={styles.circle}></button>}
        </div>
    );
};

export default Circle;
