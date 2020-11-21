/**
 Заносим игроков. Организуем турнирную сетку в два круга между игроками
 Выводим результаты в консоль.
 Запуск через node sample.js
 */

'use strict';


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Game {
    constructor(player1, player2) {
        this.players = [player1, player2];
    }

    start() {
        this.gameResult = getRandomIntInclusive(0, 1);
        this.winner = this.players[this.gameResult];
    }

    getResults(){
        if(this.gameResult === undefined){
            throw new Error(`error on display game results players pair: ${this.players[0]} - ${this.players[1]}: `
                + "try to call start() before this action");
        }
        // console.info(`${this.winner} win!`)
        console.info(`${this.players[(this.gameResult)%2]}, '1 - 0', ${this.players[(this.gameResult+1)%2]}`);
    }
}

class Round{
    constructor(name, gameList) {
        this.name = name;
        this.gameList = gameList;
    }

    start(){
        this.gameList.forEach((game) => game.start());
    }

    getResults(){
        console.info(this.name);
        this.gameList.forEach((game) => game.getResults());
    }
}


class Championship {
    constructor(players) {
        this.players = players;
    }

    setSchedule(roundsCount) {
        if(!Number.isInteger(roundsCount) || roundsCount === 0){
            throw new Error(`error on define count of rounds`);
        }
        this.rounds = [];
        let roundNumber = 1;
        while(roundNumber <= roundsCount){
            this.rounds.push(this.setRound(`${roundNumber} round`,this.players));
            roundNumber++;
        }
    }

    setRound(name, players){
        let gameList = [];
        for(let player = 0; player < players.length; player++){
            for (let enemy = 0; enemy < players.length; enemy++){
                if (player < enemy){
                    gameList.push(new Game(players[player], players[enemy]));
                }
            }
        }
        return new Round(name, gameList);
    }

    startChampionship() {
        this.rounds.forEach((round) => round.start());
    }

    getResults() {
        this.rounds.forEach((round) => round.getResults());
    }
}


const players = [
    'Alexey',
    'Artur',
    'Kirill',
    'Vlad'
]

const championship = new Championship(players);
championship.setSchedule(2);
championship.startChampionship();
championship.getResults();

