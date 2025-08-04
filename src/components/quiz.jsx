import React from "react"
import "./quiz.css"
import Questions from "./questions.jsx"
import { QuizContext } from "../QuizContext.jsx"

export default function Quiz(){

    const questionsArray=React.useContext(QuizContext)

    const [score, setScore] =React.useState(0)

        function incrementScore(){     
        setScore(prevScore => prevScore +1)
    }

    const [selectedAnswers, setSelectedAnswers] = React.useState({})

    function handleSelectedAnswers(questionText, answer){

        setSelectedAnswers(prevAnswers=>{
            return {
                ...prevAnswers,
                [questionText]:answer
            }
        })
    }

    const count = Object.entries(selectedAnswers).length

    const prepQuestions=questionsArray.map(question=>(
        <Questions  key={question.question}
                    data={question}
                    incrementScore={incrementScore}
                    handleSelectedAnswers={handleSelectedAnswers}
        />
    ))
    
    function handleClick(){
        window.location.reload()
    }

    return(
        <div className="quiz-box">
            {prepQuestions}
            <div className="results-container">
                <p className="centered">You scored {score} / 5 questions correct</p>
                <div className="button-border">
                    { count === 5 ? (<button className="button" onClick={handleClick}>Play Again</button>) : null}
                </div>
            </div>
        </div>
    )

}


