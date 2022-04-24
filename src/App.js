import Circle from "./Components/Circle";
import Button from "./Components/Button";
import Score from "./Components/Score";
import Popup from "./Components/Popup";
import Backdrop from "./Components/Backdrop";
import Difficulty from "./Components/Difficulty";
import { Component } from "react";
import click from "./sounds/splat.ogg";
import music from "./sounds/music.ogg";
import endSound from "./sounds/game_over.wav";

const gameMusic = new Audio(music);
const stopSound = new Audio(endSound);

class App extends Component {
    state = {
        gameOn: false,
        difficultySet: false,
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
        const newCircles = Array.apply(
            null,
            Array(this.state.circles.length)
        ).map(() => {
            return false;
        });
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
        gameMusic.play();
    };

    stopGame = () => {
        this.setState({ gameOn: false });
        this.setState({ showPopup: true });
        clearTimeout(this.timer);
        gameMusic.pause();
        stopSound.play();
    };

    handleClickStop = () => {
        this.setState({ showPopup: true });
        this.stopGame();
    };

    handleClickCircle = (circle) => {
        if (circle) {
            this.setState({ score: this.state.score + 1 });
            this.setState({ rounds: this.state.rounds - 1 });
            const clickSound = new Audio(click);
            clickSound.play();
        } else {
            this.stopGame();
        }
    };

    handlePopupClose = () => {
        this.setState({ showPopup: false });
        this.reloadGame();
    };

    handleDifficulty = (difficulty) => {
        this.setState({
            circles: new Array(difficulty.circles).fill(false),
            difficultySet: true,
        });
    };

    render() {
        return (
            <>
                <div className="container">
                    <h1>Get the bugs!</h1>
                    {!this.state.difficultySet && (
                        <>
                            <h3>Choose difficulty</h3>
                            <Difficulty handleClick={this.handleDifficulty} />
                        </>
                    )}
                </div>
                {this.state.difficultySet && (
                    <>
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
                                        circles={this.state.circles}
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
                        {this.state.showPopup && (
                            <div>
                                <Backdrop />
                                <Popup
                                    score={this.state.score}
                                    handleClick={this.handlePopupClose}
                                />
                            </div>
                        )}
                    </>
                )}
            </>
        );
    }
}

export default App;
