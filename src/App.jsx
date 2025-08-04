import React from "react"
import Welcome from "./components/welcome.jsx"
import Quiz from "./components/quiz.jsx"
import { QuizContext } from "./QuizContext.jsx"

export default function App(){
    const [QuestionsArray,setQuestionsArray]=React.useState([])
    const [quizStarted, setQuizStarted] = React.useState(false)

    function decodeHTML(str){
        try { return decodeURIComponent(atob(str).split('').map(function(c) {return '%' + ('00' +c.charCodeAt(0).toString(16)).slice(-2);
                    }).join('')); }
        catch (e) { 
            return atob(str); }
    }
    
    React.useEffect(()=> {
        fetch('https://opentdb.com/api.php?amount=5&encode=base64')         
        .then(response => response.json())
         .then(data => {const QuestionsObjectArray= data.results.map(questionObjectEncoded=>{
                                                        const question= decodeHTML(questionObjectEncoded.question)
                                                        const correctAnswer=decodeHTML(questionObjectEncoded.correct_answer) 
                                                        const wrongAnswers=questionObjectEncoded.incorrect_answers.map(answer=>decodeHTML(answer))
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


