class RPS {

    constructor(p1, p2) {
        this.players = [p1, p2];
        this.turns = [null, null];

        this.sendToPlayers('Match Started!');

        this.players.forEach((player, i) => {
            player.on('turn', (turn) => {
                this.onTurn(i, turn)
            })
        })

    }

    sendToPlayer(i, msg) {
        this.players[i].emit('message', msg);
    }

    sendToPlayers(msg) {
        this.players.forEach((player) => {

            player.emit('message', msg);

        });
    }

    onTurn(i, turn) {
        this.turns[i] = turn;
        this.sendToPlayer(i, `You selected ${turn}`);
    }

}

module.exports = RPS;