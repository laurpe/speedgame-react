import Button from "./Button";

const Difficulty = ({ handleClick }) => {
    return (
        <div>
            <Button
                handleClick={() => handleClick({ level: "easy", circles: 4 })}
                title="Easy"
            />
            <Button
                handleClick={() => handleClick({ level: "medium", circles: 6 })}
                title="Medium"
            />
            <Button
                handleClick={() => handleClick({ level: "hard", circles: 8 })}
                title="Hard"
            />
        </div>
    );
};

export default Difficulty;
