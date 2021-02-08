import React, { Component } from "react";
import QuestionCard from "./components/QuestionCard";
import { Button } from "reactstrap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isStarted: false,
    };
  }

  handleStart = () => {
    this.setState({ isStarted: true });
  };

  render() {
    const { isStarted } = this.state;
    return (
      <div className="App">
        <h1>REACT QUIZ APP</h1>
        {!isStarted && (
          <Button onClick={this.handleStart} color="primary" id="start">
            Start
          </Button>
        )}
        {isStarted && <QuestionCard />}
      </div>
    );
  }
}

export default App;
