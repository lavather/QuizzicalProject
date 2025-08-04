import React from "react"
import "./quiz.css"


export default function Questions(props){

    const [selectedAnswer, SetSelectedAnswer]= React.useState()
    const [isAnswered, setIsAnswered]= React.useState(false)

    function handleClick(x){


        SetSelectedAnswer(()=>x)
        setIsAnswered(()=>true)
        if(x===props.data.correctAnswer){
            props.incrementScore()
        }
        props.handleSelectedAnswers(props.data.question, x)
    }

    function selectClass(x){
            if(isAnswered){
                if(x===props.data.correctAnswer){
                    return ("answer-button green disabled")
                }
                else if(x===selectedAnswer){
                    return ("answer-button red disabled")
                }
                else {
                    return ("answer-button disabled fade")
                }
            }
            else{
                return ("answer-button")
            }
    }

    const answerDisplay=props.data.shuffledAnswers.map((answer)=>
                <button key={answer} 
                        className={selectClass(answer)}
                        onClick={()=>handleClick(answer) }>
                            {answer}
                </button>)

    return(
            <div className="quiz-questions-box">
                <h1 className="karla-h1">{props.data.question}</h1>
                <div className="quiz-answer-box">
                    {answerDisplay}
                </div>
            </div>
        
    )
}