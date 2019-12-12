'use strict';
/**
 Заносим игроков. Организуем турнирную сетку в два круга между игроками
 Выводим результаты в консоль.
 Запуск через node sample.js
 */
const players = ['Alexey', 'Artur', 'Kirill', 'Vlad'];

class Game {
  constructor({p1, p2}) {
    this.player1 = p1;
    this.player2 = p2;
    this.isPlayer1Win = undefined;
  }

  play() {
    const player1Win = Boolean(Math.round(Math.random()));
    switch (player1Win) {
      case true:
        this.isPlayer1Win = true;
        console.info(this.player1, '1 - 0', this.player2);
        break;

      case false:
        this.isPlayer1Win = false;
        console.info(this.player1, '0 - 1', this.player2);
        break;
    }
  }
}

class Championship {
  constructor(gamers) {
    this.currentGame = [];
    this.allGames = [];
    this.gamers = gamers;
  }

  setSchedule() {
    this.currentGame = [];

    for (let i = 0; i < this.gamers.length; i++) {
      for (let j = 0; j < this.gamers.length; j++) {
        if (i < j) {
          this.currentGame.push(new Game({
            p1: this.gamers[i],
            p2: this.gamers[j],
          }));
        }
      }
    }

    this.allGames.push(...this.currentGame);
  }

  play() {
    this.currentGame.map((game) => game.play());
  }

  getResults() {
    return this.allGames.reduce((prev, current) => {
      if (current.isPlayer1Win) {
        return {
          ...prev,
          [current.player1]: (prev[current.player1] || 0) + 1,
          [current.player2]: prev[current.player2] || 0,
        };
      }

      return {
        ...prev,
        [current.player1]: prev[current.player1] || 0,
        [current.player2]: (prev[current.player2] || 0) + 1,
      };
    }, {});
  }
}

const champinonship = new Championship(players);
const games = 2;

for (let i = 0; i < games; i++) {
  console.info(`${i + 1}nd round`);
  champinonship.setSchedule();
  champinonship.play();
}

const results = champinonship.getResults();
console.info('Results', results);
