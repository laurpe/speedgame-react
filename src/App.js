import Circle from "./Components/Circle";
import Button from "./Components/Button";
import Score from "./Components/Score";
import { useState } from "react";

const App = () => {
    const [gameOn, setGameOn] = useState(false);
    const [circles, setCircles] = useState([false, false, false, false]);

    const handleClickStart = () => {
        setActiveCircle();
        console.log(circles);
    };

    const handleClickStop = () => {
        console.log("stop button clicked");
    };

    // const handleClickCircle = (index) => {
    //   if (index !== )
    // }

    //returns the index of the next active
    const pickNew = () => {
        const nextActive = Math.floor(Math.random() * 4);
        const active = circles.indexOf(true);
        console.log("active", active);
        console.log("nextActive", nextActive);

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
    };

    // setTimeout(() => {
    //     setActiveCircle();
    // }, 1000);

    return (
        <div className="container">
            <header>
                <h1>Get the bugs!</h1>
            </header>
            <main>
                <Score />
                <div className="circles">
                    {circles.map((circle, index) => {
                        return <Circle circle={circle} key={index} />;
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
