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
    const [numLetters, setNumLetters] = useState("");
    const [success, setSuccess] = useState(false);
    const [serverResponse, setServerResponse] = useState("");
    const [AllResultsView, setAllResultsView] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getNumOfLetters = () => {
        StartTheGame(gameID)
            .then(results => {
                setNumLetters(results.numOfLetters);
                setIsLoading(false)
            });
    }
    const updateView = () => {
        if(serverResponse.length === parseInt(numLetters) && word.length === parseInt(numLetters)) {
            setAllResultsView( AllResultsView.concat([<WordGrid result={serverResponse} word={word}/>]))
            setWord("")
            setServerResponse("")
            inputRef.clear()
        }
    }

    useEffect(getNumOfLetters, [])
    useEffect(updateView,[serverResponse]);

    const changeWord = (value) => {
        setWord(value);
    }
    const sendIfEnter = (e) => {
        if (e.key === 'Enter') {
            sendWord();
        }
    }
    const sendWord = () => {
        sendGuess(gameID, word).then((results) => {
            setServerResponse(results.resultString);
            setSuccess(results.correctGuess);
        });
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
                        <PinInput
                            length={parseInt(numLetters)}
                            onChange={changeWord}
                            onKeyDown={sendIfEnter}
                            type="string"
                            inputMode="string"
                            style={{margin: "5px"}}
                            inputStyle={{borderColor: '#037748'}}
                            focus={true}
                            inputFocusStyle={{borderColor: '#bda443'}}
                            ref={(n) => inputRef = n}
                            autoSelect={true}
                            regexCriteria={/^[א-ת]*$/}/>
                        <button className={"button guess-button"} disabled={word.length < numLetters}
                                onClick={sendWord}>שלח
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
