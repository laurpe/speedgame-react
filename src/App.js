import Circle from "./Components/Circle";
import Button from "./Components/Button";
import Score from "./Components/Score";
import { useState } from "react";

const App = () => {
    const [gameOn, setGameOn] = useState(false);
    const [circles, setCircles] = useState([
        { id: 1, active: false },
        { id: 2, active: true },
        { id: 3, active: false },
        { id: 4, active: false },
    ]);

    const timer = () => {
        setTimeout(setGameOn, 1000);
    };

    console.log(circles);

    const handleClickStart = () => {
        console.log("start button clicked");
        setGameOn(true);
    };

    const handleClickStop = () => {
        console.log("stop button clicked");
        setGameOn(false);
    };

    // const handleClickCircle = (index) => {
    //   if (index !== )
    // }

    //returns the index of the next active
    const pickNew = (active) => {
        let nextActive = Math.floor(Math.random() * 4);

        if (nextActive !== active) {
            return nextActive;
        } else {
            return pickNew(active);
        }
    };

    const pickActiveCircle = () => {
        circles.forEach((circle) => (circle.active = false));
        let nextActive = pickNew();
        const circlesCopy = [...circles];
        circlesCopy[nextActive].active = true;
        setCircles(circlesCopy);
    };

    return (
        <div className="container">
            <header>
                <h1>Get the bugs!</h1>
            </header>
            <main>
                <Score />
                <div className="circles">
                    {circles.map((circle) => {
                        return <Circle circle={circle} key={circle.id} />;
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
