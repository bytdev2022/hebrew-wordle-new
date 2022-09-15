import React, {useEffect, useRef, useState} from 'react';
import sendGuess from '../servises/SendGuess';
import {useParams} from "react-router-dom";
import StartTheGame from '../servises/GetNewGameProp';
import WordGrid from './ResultsView'
import PinInput from 'react-pin-input';
import "../css/Buttons.css";


export default function Game() {
    let { gameID } = useParams();
    let inputRef = useRef(null);
    const [word, setWord] = useState("");
    const [num_letters, setNum_letters] = useState("");
    const [success, setSuccess] = useState(false);
    const [server_response, set_server_response] = useState("");
    const [pins, setPins] = useState(false);
    const [AllResultsView, setAllResultsView] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    let get_num_letters = function(){
        console.log(isLoading);
        StartTheGame(gameID)
            .then(results => {
                setNum_letters(results.numOfLetters);
                setPins(true)
                console.log(results.numOfLetters)
                setIsLoading(false)
            });
    }

    let check_if_success = function(){
        if (server_response && server_response.length === parseInt(num_letters) && server_response.split("*").join("") === "") {
            setSuccess(true);
        }
    }

    let updateView = function(){
        if(server_response.length === parseInt(num_letters) && word.length === parseInt(num_letters)){
            setAllResultsView( AllResultsView.concat([<WordGrid result={server_response} word={word}/>]))
            setWord("")
            set_server_response("")
            inputRef.clear()
        }
    }

    useEffect(get_num_letters,[]);
    useEffect(updateView,[server_response]);
    useEffect(check_if_success,[num_letters, server_response]);


    function changeWord(value,index) {
        setWord(value);
    }

    function sendIfEnter(e) {
        if (e.key === 'Enter') {
            sendWord();
        }
    }

    function sendWord() {
        if(word.length !== parseInt(num_letters)){
            alert("משהו לא הסתדר...\nהכנס את המילה מחדש ונסה שוב")
        }
        else sendGuess(gameID, word).then((results) => {set_server_response(results)});
    }
    return (
        <div>
            {
                isLoading ?
                    <div>
                        <h3>המתן לטעינת המשחק</h3>
                        <h4>(השרת חינמי...)</h4>
                        <div className="loader">Loading...</div>
                    </div>
                    :
                    <div>
                        <h2 style={{margin: "10px"}}> נחשו מהי המילה: </h2>
                        < PinInput
                            length={parseInt(num_letters)}
                            initialValue=""
                            onChange={changeWord}
                            onKeyDown={sendIfEnter}
                            type="string"
                            inputMode="string"
                            style={{margin: "5px"}}
                            inputStyle={{borderColor: '#037748'}}
                            focus={true}
                            inputFocusStyle={{borderColor: '#bda443'}}
                            ref={(n) => inputRef = n}
                            // onComplete={(value, index) => {}}
                            autoSelect={true}
                            regexCriteria={/^[א-ת]*$/}/>
                        <button className={"button guess-button"} disabled={word.length < num_letters}
                                onKeyDown={sendIfEnter} onClick={sendWord}>שלח
                        </button>
                    </div>
            }
            <div style={{margin: "5px"}}>
                {AllResultsView}
            </div>

            {
                AllResultsView.length < 6 ?
                    success &&
                            <h2>כל הכבוד!</h2>
                    :
                    success ?
                        <h2>יותר מזל משכל...</h2> : <h2>חבל, נגמרו לך הניחושים.</h2>
            }
        </div>
    );
}
