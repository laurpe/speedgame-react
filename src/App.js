import Circle from "./Components/Circle";
import Button from "./Components/Button";
import Score from "./Components/Score";
import Popup from "./Components/Popup";
import Backdrop from "./Components/Backdrop";
import Difficulty from "./Components/Difficulty";
import { Component } from "react";

class App extends Component {
    state = {
        gameOn: false,
        difficultySet: false,
        difficulty: "",
        //circles empty array in beginning, handleDifficulty sets circles for start
        circles: [],
        rounds: 0,
        pace: 1000,
        score: 0,
        showPopup: false,
    };
    timer;

    reloadGame = () => {
        window.location.reload();
    };

    pickNew = () => {
        const nextActive = Math.floor(Math.random() * 4);
        const active = this.state.circles.indexOf(true);
        if (nextActive !== active) {
            return nextActive;
        } else {
            return this.pickNew();
        }
    };

    setActiveCircle = () => {
        const nextActive = this.pickNew();
        const newCircles = [false, false, false, false];
        newCircles[nextActive] = true;
        this.setState({ circles: newCircles });
        this.setState({ pace: this.state.pace - 10 });
        if (this.state.rounds >= 5) {
            this.stopGame();
        }
        this.setState({ rounds: this.state.rounds + 1 });
        console.log(this.state.pace);
        this.timer = setTimeout(this.setActiveCircle, this.state.pace);
    };

    handleClickStart = () => {
        this.setState({ gameOn: true });
        this.setActiveCircle();
    };

    stopGame = () => {
        this.setState({ gameOn: false });
        this.setState({ showPopup: true });
        clearTimeout(this.timer);
    };

    handleClickStop = () => {
        this.setState({ showPopup: true });
        this.stopGame();
    };

    handleClickCircle = (circle) => {
        if (circle) {
            this.setState({ score: this.state.score + 1 });
            this.setState({ rounds: this.state.rounds - 1 });
        } else {
            this.stopGame();
        }
    };

    handlePopupClose = () => {
        this.setState({ showPopup: false });
        this.reloadGame();
    };

    handleDifficulty = (difficulty) => {
        console.log("handleDifficulty called, difficulty: ", difficulty);
        switch (difficulty) {
            case "easy":
                this.setState({
                    circles: [false, false, false],
                    difficultySet: true,
                    difficulty: "easy",
                });
                break;
            case "medium":
                this.setState({
                    circles: [false, false, false, false, false],
                    difficultySet: true,
                    difficulty: "medium",
                });
                break;
            case "hard":
                this.setState({
                    circles: [false, false, false, false, false, false, false],
                    difficultySet: true,
                    difficulty: "hard",
                });
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <div>
                <header>
                    <h1>Speedgame</h1>
                </header>
                {!this.state.difficultySet && (
                    <Difficulty handleClick={this.handleDifficulty} />
                )}
                {this.state.difficultySet && (
                    <div>
                        <div className="container">
                            <main>
                                <Score score={this.state.score} />
                                <div className="circles">
                                    {this.state.circles.map((circle, index) => {
                                        return (
                                            <Circle
                                                circle={circle}
                                                key={index}
                                                handleClickCircle={
                                                    this.handleClickCircle
                                                }
                                                gameOn={this.state.gameOn}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="buttons">
                                    {this.state.gameOn && (
                                        <Button
                                            handleClick={this.handleClickStop}
                                            title="Stop"
                                        />
                                    )}
                                    {!this.state.gameOn && (
                                        <Button
                                            handleClick={this.handleClickStart}
                                            title="Start"
                                        />
                                    )}
                                </div>
                            </main>
                        </div>
                        {this.state.showPopup && (
                            <div>
                                <Backdrop />
                                <Popup
                                    score={this.state.score}
                                    handleClick={this.handlePopupClose}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default App;
