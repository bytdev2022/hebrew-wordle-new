import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import sendNewWord from '../servises/SendNewWord';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
// import choosePlay from './CopyUrlOrStartGame'
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewWordInput() {
    const [word, setWord] = useState("");
    const [word_to_send, setWord_to_send] = useState("");
    const [server_response, set_server_response] = useState("");
    const [valid_word, setValidWord] = useState("");
    const [gameID, setGameID] = useState("");
    const [alert_copy, setAlertCopy] = useState(false);
    const [back_to_star_button, setBackButton] = useState(false);
    const [open, setOpen] = React.useState(false);
    let gameLink = `game/${gameID}`;
    let newWordComponent = "/";
    let current_url = window.location.href;
    let game_url = current_url.replace("/choosePlay/", "/game/")
    const err_msg = "מצטערים!\n יש תקלה בחיבור לשרת. אנא פנה לתמיכה טכנית.";

    let navigate = useNavigate();

    function changeWord(e) {
        setWord(e.target.value);
    }

    function sendIfEnter(e) {
        if (e.key === 'Enter') {
            sendWord();
        }
    }

    function sendWord() {
        setWord_to_send(word)
        sendNewWord(word)
            .then(game_id => {
                setGameID(game_id);
            });
        handleClickOpen();
    }


    let copy_game_link = function(){
        navigator.clipboard.writeText(game_url + gameLink)
            .then(() => {
                setAlertCopy(true);
                setBackButton(true)
                setTimeout(()=>{
                    setAlertCopy(false);
                },4000)
            });
    }
    let navigateToStart = function(){
        handleClose()
        setWord("");
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div >
            {
                alert_copy &&
                <Alert align="center" severity='success'>הקישור הועתק!</Alert>
            }
            <span className="header_font" >ברוכים הבאים למשחק וורדל</span>
            <br/>
            <TextField id="word_input" label="נא הכנס את המילה שלך..." value={word} color={valid_word} onChange={changeWord} onKeyDown={sendIfEnter} variant="outlined" />
            {/*<input onChange={changeWord} onKeyDown={sendIfEnter} type="text" />*/}
            <div>
                <Button size="large" sx={{padding: 1, margin: 2 }} variant="contained" onClick={sendWord} >בחר</Button>
            </div>
            {/*<h2>{word_to_send}</h2>*/}
            <h3>{server_response}</h3>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="dialog-slide-description"
            >
                <DialogTitle>{"איך תרצה להמשיך?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="choose option">
                        בחר מה ברצונך לעשות
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to={gameLink} >
                        <Button sx={{padding: 1, margin: 2 }} variant="contained" color="success">להמשיך למשחק</Button>
                    </Link>
                    <Button sx={{padding: 1, margin: 2 }} variant="outlined" color="success" onClick={copy_game_link}>להעתיק את הקישור</Button>
                    <Button sx={{padding: 1, margin: 2 }} variant="outlined" color="error" onClick={navigateToStart}>לחזרה לדף הראשי</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
