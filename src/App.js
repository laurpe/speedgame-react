import Circle from "./Components/Circle";
import Button from "./Components/Button";
import Score from "./Components/Score";
import Popup from "./Components/Popup";
import Backdrop from "./Components/Backdrop";
import { Component } from "react";

class App extends Component {
    state = {
        gameOn: false,
        circles: [false, false, false, false],
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

    render() {
        return (
            <div>
                <div className="container">
                    <header>
                        <h1>Get the bugs!</h1>
                    </header>
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
        );
    }
}

export default App;
