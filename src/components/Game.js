import React, {useEffect, useRef, useState} from 'react';
import sendGuess from '../servises/SendGuess';
import {useParams} from "react-router-dom";
import StartTheGame from '../servises/GetNewGameProp';
import WordGrid from './ResultsView'
import PinInput from 'react-pin-input';
import Button from "@mui/material/Button";


export default function Game() {
    let { gameID } = useParams();
    let inputRef = useRef(null);
    const [word, setWord] = useState("");
    const [num_letters, setNum_letters] = useState("");
    const [success_msg, setSuccess_msg] = useState("");
    const [server_response, set_server_response] = useState("");
    const [pins, setPins] = useState(false);
    const [AllResultsView, setAllResultsView] = useState([]);



    let get_num_letters = function(){
        StartTheGame(gameID)
            .then(results => {
                setNum_letters(results.numOfLetters);
                setPins(true)}
            );
    }

    let check_if_success = function(){
        if (server_response && server_response.length === parseInt(num_letters) && server_response.split("*").join("") === "") {
            setSuccess_msg("שכוייח!!")
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

    useEffect(get_num_letters,[gameID]);
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
            <h2> נחשו מה המילה:  </h2>
            {
                pins &&
                < PinInput
                    length={parseInt(num_letters)}
                    initialValue=""
                    onChange={changeWord}
                    onKeyDown={sendIfEnter}
                    type="string"
                    inputMode="string"
                    style={{padding: '10px'}}
                    inputStyle={{borderColor: 'green'}}
                    inputFocusStyle={{borderColor: 'yellow'}}
                    ref={(n) => inputRef=n}
                    // onComplete={(value, index) => {}}
                    autoSelect={true}
                    regexCriteria={/^[א-ת]*$/} />
            }
            {/*<input onChange={changeWord} onKeyDown={sendIfEnter} value={word} type="text" />*/}
            <Button size="large" sx={{padding: 1, margin: 2, backgroundColor:'green'}} variant="contained" onKeyDown={sendIfEnter} onClick={sendWord} >בחר</Button>

            {/*<button onClick={sendWord} >שלח</button>*/}
            {AllResultsView}
            <h2>{success_msg}</h2>

        </div>
    );
}
