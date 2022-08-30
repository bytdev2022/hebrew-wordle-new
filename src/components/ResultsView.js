import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';


const InPlace = styled(Paper)(({ theme }) => ({
    backgroundColor: '#70F161',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const NotInWord = styled(Paper)(({ theme }) => ({
    backgroundColor: '#727372',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const InWord = styled(Paper)(({ theme }) => ({
    backgroundColor: '#F1EC4C',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default function WordGrid(props) {
    const word = props.word;
    const result = props.result;

    let WordResultView = result.split("").map(function(char, index) {
        if (char === "*"){
            return ( <Grid xs={1}> <InPlace> {word[index]} </InPlace> </Grid> )
        }
        if (char === "#"){
            return ( <Grid xs={1}> <InWord> {word[index]} </InWord> </Grid> )
        }
        if (char === "-"){
            return ( <Grid xs={1}> <NotInWord> {word[index]} </NotInWord> </Grid> )
        }
        else return <></>
    })

    return (
        <Grid container justifyContent="center" spacing={3}>
            {WordResultView}
        </Grid>
    );
}
