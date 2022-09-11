import React, {useEffect, useRef, useState} from 'react';
import sendGuess from '../servises/SendGuess';
import {useParams} from "react-router-dom";
import StartTheGame from '../servises/GetNewGameProp';
import WordGrid from './ResultsView'
import PinInput from 'react-pin-input';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";


export default function Game() {
    let { gameID } = useParams();
    let inputRef = useRef(null);
    const [word, setWord] = useState("");
    const [counter, setCounter] = useState(1);
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
            setSuccess_msg("כל הכבוד!!\n הצלחתם לגלות את המילה תוך " + counter.toString() + " נסיונות!")
        }
    }

    let updateResults = function(){
        if(server_response.length === parseInt(num_letters) && word.length === parseInt(num_letters)){
            setAllResultsView( AllResultsView.concat([<WordGrid result={server_response} word={word}/>]))
            setCounter(counter + 1)
            check_if_success()
            setWord("")
            set_server_response("")
            inputRef.clear()
        }
    }

    useEffect(get_num_letters,[gameID]);
    useEffect(updateResults,[server_response]);


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
                pins ?
                < PinInput
                    length={parseInt(num_letters)}
                    initialValue=""
                    onChange={changeWord}
                    // onKeyDown={sendIfEnter}
                    type="string"
                    inputMode="string"
                    style={{padding: '10px'}}
                    inputStyle={{borderColor: 'green'}}
                    inputFocusStyle={{borderColor: 'yellow'}}
                    ref={(n) => inputRef=n}
                    // onComplete={(value, index) => {}}
                    autoSelect={true}
                    regexCriteria={/^[א-ת]*$/} /> : <CircularProgress color="secondary"/>
            }
            <Button size="large" sx={{padding: 1, margin: 2, backgroundColor:'green'}} variant="contained" onKeyDown={sendIfEnter} onClick={sendWord} >בחר</Button>
            {AllResultsView}
            <h2>{success_msg}</h2>
        </div>
    );
}
