import React from "react"
import Welcome from "./components/welcome.jsx"
import Quiz from "./components/quiz.jsx"
import { QuizContext } from "./QuizContext.jsx"

export default function App(){
    const [QuestionsArray,setQuestionsArray]=React.useState([])
    const [quizStarted, setQuizStarted] = React.useState(false)
    
    React.useEffect(()=> {
        fetch('https://opentdb.com/api.php?amount=5&encode=base64')         
        .then(response => response.json())
         .then(data => {const QuestionsObjectArray= data.results.map(questionObjectEncoded=>{
                                                        const question= atob(questionObjectEncoded.question)
                                                        const correctAnswer=atob(questionObjectEncoded.correct_answer) 
                                                        const wrongAnswers=questionObjectEncoded.incorrect_answers.map(answer=>atob(answer))
                                                        const allAnswersArray=[correctAnswer,...wrongAnswers]
                                                        const shuffledAnswersArray=allAnswersArray.sort(()=>Math.random() - 0.5)
                                                        return{ question:question,
                                                                correctAnswer:correctAnswer,
                                                                incorrect_answers:wrongAnswers,
                                                                shuffledAnswers:shuffledAnswersArray
                                                            }
                                                    })
                        setQuestionsArray(QuestionsObjectArray)
                        
                });
    },[])

    function handleClick(){
        setQuizStarted(prevStarted => !prevStarted)
    }

    return (
       <>   { quizStarted ? (
                <QuizContext.Provider value={QuestionsArray}>
                    <Quiz />      
                </QuizContext.Provider>)
            : (<Welcome handleClick={handleClick}/>)}
     </>
    )
}


