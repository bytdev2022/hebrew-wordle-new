import config from '../configuration.json';

export default function StartTheGame(gameId) {
    let url = config.serverUrl;

    return fetch(`${url}/new-game/${gameId}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObject) => {
            return jsonObject;
        });
}