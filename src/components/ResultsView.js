import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

const InPlace = styled(Grid)(({ theme }) => ({
    backgroundColor: 'Chartreuse',
    padding: theme.spacing(2),
    width: "50px",
    height: "50px",

}));

const NotInWord = styled(Grid)(({ theme }) => ({
    backgroundColor: '#727372',
    padding: theme.spacing(2),
    width: "50px",
    height: "50px",
}));
const InWord = styled(Grid)(({ theme }) => ({
    backgroundColor: '#fff62b',
    padding: theme.spacing(2),
    width: "50px",
    height: "50px",
}));
export default function WordGrid(props) {
    const word = props.word;
    const result = props.result;

    let WordResultView = result.split("").map(function(char, index) {
        if (char === "*"){
            return ( <Grid > <InPlace > {word[index]} </InPlace> </Grid> )
        }
        if (char === "#"){
            return ( <Grid > <InWord> {word[index]} </InWord> </Grid> )
        }
        if (char === "-"){
            return ( <Grid > <NotInWord> {word[index]} </NotInWord> </Grid> )
        }
        else return <></>
    })

    return (
        <Grid container direction={"row"} justifyContent="center" spacing={0.9}>
            {WordResultView}
        </Grid>
    );
}
