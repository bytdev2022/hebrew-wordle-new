

export default function SendGuess(game_id, guess) {
    let url = "https://hebrew-wordle-server.herokuapp.com";

    return fetch(`${url}/game/${game_id}/?word=${guess}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObject) => {
            return jsonObject;
        });
}