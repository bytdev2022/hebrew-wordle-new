import config from '../configuration.json';

export default function SendNewWord(guessedWord) {
    let url = config.serverUrl;

    return fetch(`${url}/new-game?word=${guessedWord}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObject) => {
            return jsonObject["gameId"];
        });
}