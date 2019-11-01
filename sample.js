/**
 Заносим игроков. Организуем турнирную сетку в два круга между игроками
 Выводим результаты в консоль.
 Запуск через node sample.js
 */
var players = [
    'Alexey',
    'Artur',
    'Kirill',
    'Vlad'
]

'using strict';

class Game {
    constructor({p1, n2}) {
        this.player1 = p1;
        this.player2 = n2;

        this.isPlayer1Win = undefined;
    }

play() {
    var player1Win = Math.round(Math.random());
    switch (player1Win) {
        case 1:
            this.isPlayer1Win = true;
            console.info(this.player1, '1 - 0', this.player2);
        case 0:
            if (!this.isPlayer1Win) {
                console.info(this.player1, '0 - 1', this.player2);
            }
    }
}}

class Championship {
    constructor(gamerzz) {
        this.games = []
        this._t = gamerzz;
        this.setSchedule()
    }

    setSchedule() {
        for (var i = 0; i < this._t.length; i++) {
            for (var j = 0; j < this._t.length; j++) {
                if (i < j) this.games.push(new Game({p1: this._t[i], n2: this._t[j]}));
            }
        }

        // должен быть второй круг с надписью второй круг перед его стартом, но почему-то не работает :(
        // console.info('2nd round');

        // rematches // 2nd round
        for (var i = 0; i < this._t.length; i++) {
            for (var j = 0; j < this._t.length; j++) {
                if (i < j) this.games.push(new Game({p1: this._t[i], n2: this._t[j]}));
            }
        }
    }

    play() {
        this.games.map((game) => game.play());
    }

    getResults() {
        return this.games.reduce((prev, current) => {
            if (current.isPlayer1Win) {
                return {
                    ...prev,
                    [current.player1]: (prev[current.player1] || 0) + 1,
                    [current.player2]: (prev[current.player2] || 0)
                }
            }

            return {
                ...prev,
                [current.player1]: (prev[current.player1] || 0),
                [current.player2]: (prev[current.player2] || 0) + 1
            }
        }, {})
    }
}


const champinonship = new Championship(players);
champinonship.play();
let results = champinonship.getResults();
console.info('Results', results);
