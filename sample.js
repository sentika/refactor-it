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
        this.player1 = player1;
        this.player2 = player2;
    }

    printResultOfGame(zeroOrOne) {
        console.info(this.player1, `${zeroOrOne} - ${1 - zeroOrOne}`, this.player2);
    }

    startGame() {
        this.player1Win = Math.round(Math.random());
        this.printResultOfGame(this.player1Win);
    }
}

class Championship {
    constructor(listOfPlayers) {
        this.listOfAllGames = [];
        this.listOfGamesInFirstRound = [];
        this.listOfGamesInSecondRound = [];

        this._listOfPlayers = listOfPlayers;

        this.setListOfGames(this.listOfGamesInFirstRound);
        this.setListOfGames(this.listOfGamesInSecondRound);

    }

    setListOfGames(listOfGames) {
        for (let i = 0; i < this._listOfPlayers.length; i++) {
            for (let j = 0; j < this._listOfPlayers.length; j++) {
                if (i < j) {
                    listOfGames
                        .push(new Game({
                            player1: this._listOfPlayers[i],
                            player2: this._listOfPlayers[j]
                        }));
                }
            }
        }
    }

    startFirstRound() {
        console.info("1st round");
        this.listOfGamesInFirstRound.map((game) => game.startGame());
    }

    startSecondRound() {
        console.info("2nd round");
        this.listOfGamesInSecondRound.map((game) => game.startGame());
    }

    startChampionship() {
        this.startFirstRound();
        this.startSecondRound();
        this.listOfAllGames = this.listOfGamesInFirstRound.concat(this.listOfGamesInSecondRound);
    }

    getResults() {
        return this.listOfAllGames.reduce((prev, current) => {
            return {
                ...prev,
                [current.player1]: (prev[current.player1] || 0) + current.player1Win,
                [current.player2]: (prev[current.player2] || 0) + 1 - current.player1Win
            }
        }, {})
    }
}


const champinonship = new Championship(players);
champinonship.startChampionship();
let results = champinonship.getResults();
console.info('Results', results);