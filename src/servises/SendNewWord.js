

export default function SendNewWord(guessedWord) {
    let url = "https://hebrew-wordle-server.herokuapp.com";

    return fetch(`${url}/new-game?word=${guessedWord}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObject) => {
            return jsonObject["gameId"];
        });
}