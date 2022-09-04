let config = require('../configuration.json');

export default function SendNewWord(game_id, guess) {
    let url = config.serverUrl;

    return fetch(`${url}/game/${game_id}/?word=${guess}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObject) => {
            return jsonObject.result;
        });
}