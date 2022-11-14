import * as React from 'react';
import "../css/ResultStyle.css";
import Grid from '@mui/material/Unstable_Grid2';

const Square = (e, color) => {
    return (
        <p style={{background: color}}>
            <span>{e}</span>
        </p>
    )
}

export default function WordGrid(props) {
    const word = props.word;
    const result = props.result;

    let WordResultView = [];
    result.split("").forEach((sign, i) => {
        if (sign === "*") {
            WordResultView.push(Square(word[i], "Chartreuse"))
        }
        if (sign === "#") {
            WordResultView.push(Square(word[i], '#fff62b'))
        }
        if (sign === "-") {
            WordResultView.push(Square(word[i], '#9e9f9e'))
        }
    })

    return (
        <Grid container direction={"row"} justifyContent="center" spacing={0.9}>
            {WordResultView}
        </Grid>
    );
}

