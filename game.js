class RPS {

    constructor(p1, p2) {
        this.players = [p1, p2];

        this.sendToPlayers('Match Started!');

    }

    sendToPlayers(msg) {
        this.players.forEach((player) => {

            player.emit('message', msg);

        });
    }

}

module.exports = RPS;