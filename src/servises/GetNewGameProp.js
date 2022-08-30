

export default function StartTheGame(gameId) {
    let url = "https://hebrew-wordle-server.herokuapp.com";

    return fetch(`${url}/new-game/${gameId}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObject) => {
            return jsonObject;
        });
}