import Circle from "./Components/Circle";
import Button from "./Components/Button";
import Score from "./Components/Score";

const App = () => {
    const handleClickStart = () => {
        console.log("button clicked");
    };

    const handleClickStop = () => {
        console.log("button clicked");
    };

    return (
        <div class="container">
            <header>
                <h1>Get the bugs!</h1>
            </header>
            <main>
                <Score />
                <div className="circles">
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                </div>
                <div class="buttons">
                    <Button onClick={handleClickStart} title="Start" />
                    <Button onClick={handleClickStop} title="Stop" />
                </div>
            </main>
        </div>
    );
};

export default App;
