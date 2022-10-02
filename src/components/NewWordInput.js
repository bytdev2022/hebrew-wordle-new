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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        sendNewWord(word)
            .then(game_id => {
                setGameID(game_id);
                handleClickOpen();
                setIsLoading(false);
            });
    }
    let gameLink = `game/${gameID}`;
    let newWordComponent = "/";
    let current_url = window.location.href;
    let game_url = current_url.replace("/choosePlay/", "/game/")
    const [alert, setAlert] = useState(false);
    const [back_to_star_button, setBackButton] = useState(false);
    const [open, setOpen] = React.useState(false);

    let copy_game_link = function(){
        navigator.clipboard.writeText(game_url + gameLink)
            .then(() => {
                setAlert(true);
                setBackButton(true)
                setTimeout(()=>{
                    setAlert(false);
                },4000)
            });
    }
    let navigateToStart = function(){
        // navigate(newWordComponent)
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
                alert &&
                <Alert align="center" severity='success'>הקישור הועתק!</Alert>
            }
            <span className="header_font" >וורדל בעברית</span>
            <br/>
            {
                isLoading?
                    <div className="loader">Loading...</div>
                    :
                    <div>
                        <TextField style={{direction: "rtl"}} id="word_input" label={"נא הכנס את המילה שלך..."}
                                   value={word} color={valid_word} onChange={changeWord} multiline onKeyDown={sendIfEnter}
                        />
                        <br/>
                        <Button size="large" sx={{padding: 1, margin: 2 }} variant="contained" onClick={sendWord} >בחר</Button>
                    </div>

            }

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
