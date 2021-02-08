import React, { useState } from "react";
import { nanoid } from "nanoid";

function Answers({ answers, handleAnswer, isAnswered, correctAnswer }) {
  const [selectedAns, setSelectedAns] = useState(0);

  const handSelection = (e, idx) => {
    console.log(idx);
    setSelectedAns(idx);
    handleAnswer(e);
  };

  return (
    <div className="answers-wrapper">
      {answers.map((answer, idx) => {
        const customCl =
          isAnswered && selectedAns === idx
            ? "wrong"
            : answer === correctAnswer
            ? "correct"
            : "answers";
        return (
          <div
            onClick={(e) => handSelection(e, idx)}
            className={customCl}
            key={idx}
            disabled={isAnswered}
          >
            {answer}
          </div>
        );
      })}
    </div>
  );
}

export default Answers;
