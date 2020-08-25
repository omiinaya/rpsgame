class RPS {

    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;

        [p1, p2].forEach(s => {

            s.emit('message', 'Match started!');

        });

    }

}

module.exports = RPS;