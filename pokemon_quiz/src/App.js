import React, { useState, useEffect } from "react";
import './App.css';

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    useEffect(() => {
        fetch("questions.json")
            .then((response) => response.json())
            .then((data) => setQuestions(data))
            .catch((error) => console.error("Error loading questions:", error));
    }, []);

    if (questions.length === 0) return <div>Betöltés...</div>;
    if (currentQuestionIndex >= questions.length)
        return <div className="end-screen">Köszönjük, hogy játszottál!</div>;

    const question = questions[currentQuestionIndex];

    const nextQuestion = () => {
        if (showCorrectAnswer) {
            setShowCorrectAnswer(false);
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setShowCorrectAnswer(true);
        }
    };

    return (
        <div className="game-container">
            <div className="question-box">{question.question}</div>
            <div className="answers">
                {question.answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`answer-btn ${
                            showCorrectAnswer
                                ? index === question.correctIndex
                                    ? "correct"
                                    : "wrong"
                                : ""
                        }`}
                    >
                        {answer}
                    </button>
                ))}
            </div>
            <button className="next-btn" onClick={nextQuestion}>
                Következő
            </button>
        </div>
    );
}

export default App;
