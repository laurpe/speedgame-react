import Button from "./Button";

const Difficulty = ({ handleClick }) => {
    return (
        <div>
            <Button handleClick={() => handleClick("easy")} title="Easy" />
            <Button handleClick={() => handleClick("medium")} title="Medium" />
            <Button handleClick={() => handleClick("hard")} title="Hard" />
        </div>
    );
};

export default Difficulty;
