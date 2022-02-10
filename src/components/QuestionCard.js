import React, { Component } from "react";
import Loading from "./Loading";
import Answers from "./Answers";
import { Button } from "reactstrap";
import { convertHtmlChars } from '../utils/decodeHtmlChars';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      amount: 10,
      category: 18,
      difficulty: "easy",
      qType: "boolean",
      isLoading: true,
      questions: [],
      questionNum: 0,
      isGameEnd: false,
      correctAnswer: null,
      isAnswered: false,
    };
  }

  fetchQuestions = async () => {
    this.setState({ isLoading: true });
    const { amount, category, difficulty, qType } = this.state;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${qType}`;
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      questions: data.results,
      isLoading: false,
      correctAnswer: data.results[0].correct_answer,
    });
  };
  componentDidMount() {
    this.fetchQuestions();
  }

  handleNext = () => {
    const { questions, questionNum } = this.state;
    if (questionNum < questions.length - 1) {
      this.setState({
        questionNum: questionNum + 1,
        correctAnswer: questions[questionNum + 1].correct_answer,
        isAnswered: false,
      });
    }
  };

  handleAnswer = (e) => {
    const { correctAnswer, score, isAnswered } = this.state;
    if (!isAnswered) {
      if (e.target.innerText === correctAnswer) {
        this.setState({
          score: score + 1,
          isGameEnd: true,
          isAnswered: true,
        });
      } else {
        this.setState({
          isGameEnd: true,
          isAnswered: true,
        });
      }
    }
  };

  render() {
    const {
      score,
      questions,
      isLoading,
      questionNum,
      isGameEnd,
      isAnswered,
    } = this.state;
    console.log(questions);
    const question = questions[questionNum];
    const answers = questions.length && [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="question-card">
            <h3>Score: {score}</h3>
            <div className="question">
              <span>Category: {question.category}</span>
              <div>
                Question {questionNum + 1} / {questions.length}
              </div>
              <div>{convertHtmlChars(question.question)}</div>
              <Answers
                answers={answers}
                handleAnswer={this.handleAnswer}
                isAnswered={isAnswered}
                correctAnswer={question.correct_answer}
              />
            </div>
            {isGameEnd && (
              <Button onClick={this.handleNext} color="primary">
                Next Question
              </Button>
            )}
          </div>
        )}
      </>
    );
  }
}

export default QuestionCard;
