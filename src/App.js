import Circle from "./Components/Circle";
import Button from "./Components/Button";
import Score from "./Components/Score";
import { useState } from "react";

const App = () => {
    const [gameOn, setGameOn] = useState(false);
    const [circles, setCircles] = useState([false, false, false, false]);
    const [rounds, setRounds] = useState(0);
    const [pace, setPace] = useState(1000);
    const [score, setScore] = useState(0);

    let timer;

    const reloadGame = () => {
        window.location.reload();
    };

    const handleClickStart = () => {
        setGameOn(true);
        setActiveCircle();
    };

    const stopGame = () => {
        setGameOn(false);
        clearTimeout(timer);
        reloadGame();
    };

    const handleClickStop = () => {
        stopGame();
    };

    const handleClickCircle = (circle) => {
        if (circle) {
            setScore(score + 1);
            setRounds(rounds - 1);
        } else {
            stopGame();
        }
    };

    const pickNew = () => {
        const nextActive = Math.floor(Math.random() * 4);
        const active = circles.indexOf(true);
        // console.log("circles inside picknew", circles);
        if (nextActive !== active) {
            return nextActive;
        } else {
            return pickNew();
        }
    };

    const setActiveCircle = () => {
        const nextActive = pickNew();
        const newCircles = [false, false, false, false];
        newCircles[nextActive] = true;
        setCircles(newCircles);
        // console.log("circles after setting new", circles);
        setPace(pace - 10);
        if (rounds >= 5) {
            stopGame();
        }
        setRounds(rounds + 1);
        console.log("rounds: ", rounds);
        timer = setTimeout(setActiveCircle, pace);
    };

    return (
        <div className="container">
            <header>
                <h1>Get the bugs!</h1>
            </header>
            <main>
                <Score score={score} />
                <div className="circles">
                    {circles.map((circle, index) => {
                        return (
                            <Circle
                                circle={circle}
                                key={index}
                                handleClickCircle={handleClickCircle}
                            />
                        );
                    })}
                </div>
                <div className="buttons">
                    {gameOn && (
                        <Button handleClick={handleClickStop} title="Stop" />
                    )}
                    {!gameOn && (
                        <Button handleClick={handleClickStart} title="Start" />
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;
