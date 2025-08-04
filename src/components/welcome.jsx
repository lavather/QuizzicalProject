
import "./welcome.css"

export default function Welcome(props){
    return (
        <div className="welcome-screen-box">
            <div className="welcome-screen-enter">
                <h1 className="karla-h1">Quizzical</h1>
                <p className="karla-p">we are here to test useless knowledge</p>
                <button className="button" onClick={props.handleClick} >Press meh</button>
            </div>
        </div>
    )
}