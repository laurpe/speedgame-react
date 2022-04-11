import styles from "./Circle.module.css";

const Circle = ({ circle }) => {
    return (
        <div>
            {circle.active && <button className={styles.circleActive}></button>}
            {!circle.active && <button className={styles.circle}></button>}
        </div>
    );
};

export default Circle;
