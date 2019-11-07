/**
 Заносим игроков. Организуем турнирную сетку в два круга между игроками
 Выводим результаты в консоль.
 Запуск через node sample.js
 */
'use strict';

let players = [
    'Alexey',
    'Artur',
    'Kirill',
    'Vlad'
];

class Game {
    constructor({ player1, player2 }) {
        this.p1 = player1;
        this.p2 = player2;
    }

    displayResult() {
        console.info(this.p1, `${oneZero} - ${1 - oneZero}`, this.p2);
    }

    playGame() {
        this.player1Win = Math.round(Math.random());
        this.displayResult(this.player1Win);
    }
}

class Championship {
    constructor(playersList) {
        this.gamesList = []
        this.firstRoundGamesList = [];
        this.secondRoundGamesList = [];

        this._playersList = playersList;

        this.setGamesList(this.firstRoundGamesList);
        this.setGamesList(this.secondRoundGamesList);
    }

    setGamesList(gamesList) {
        for (let i = 0; i < this._playersList.length; i++) {
            for (let j = 0; j < this._playersList.length; j++) {
                if (i < j) {
                    gamesList.push(new Game({
                        player1: this._listOfPlayers[i],
                        player2: this._listOfPlayers[j]
                    }));
                }
            }
        }
    }

    //1st round
    beginFirstRound() {
        console.info("Round 1!");
        this.firstRoundGamesList.map((game) => game.playGame());
    }

    //2nd round
    beginSecondRound() {
        console.info("Round 2!");
        this.secondRoundGamesList.map((game) => game.playGame());
    }

    startChamp() {
        this.beginFirstRound();
        this.beginSecondRound();
        this.gamesList = this.firstRoundGamesList.concat(this.secondRoundGamesList);
    }

    getResults() {
        return this.gamesList.reduce((previous, current) => {
            return {
                ...previous,
                [current.player1]: (previous[current.player1] || 0) + current.player1Win,
                [current.player2]: (previous[current.player2] || 0) + 1 - current.player1Win
            }
        }, {})
    }
}


const championship = new Championship(players);
championship.startChamp();
let results = championship.getResults();
console.info('Results', results);
