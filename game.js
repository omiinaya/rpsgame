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
        this.sendToPlayer(i, `You chose ${turn}`);

        this.gameOver();
    }

    gameOver() {
        const turns = this.turns;
        if (turns[0] && turns[1]) {
            this.sendToPlayer(0, 'Your oponent chose ' + this.turns[1]);
            this.sendToPlayer(1, 'Your opponent chose ' + this.turns[0]);
            this.gameResult();
            this.sendToPlayers('Next Round!');
        }
    }

    gameResult() {
        const p0 = this.turns[0]
        const p1 = this.turns[1]

        //if choices are the same, then tie.
        if (p0 == p1) {
            this.sendToPlayers('You tie!');
        } 
        
        //if player 0 won, then send players their corresponding results.
        else if ((p0 == "rock" && p1 == "scissors") || 
                 (p0 == "paper" && p1 == "rock") || 
                 (p0 == "scissors" && p1 == "paper")) {
            this.sendToPlayer(0, 'You won!');
            this.sendToPlayer(1, 'You lost.');
        } 
        
        //if player 0 and 1 did not tie, and player 0 did not win, that means player 1 won.
        else {
            this.sendToPlayer(0, 'You lost.');
            this.sendToPlayer(1, 'You won!');
        }

        //resetting turns back to null for continuous rounds.
        this.turns = [null, null];
    }

}

module.exports = RPS;