class HanoiGame {
  constructor(towers) {
    this.towers= towers;

    if(this.towers === undefined) {
      this.towers = [[3, 2, 1], [], []]
    }

  }

  // HanoiGame.isValidMove(x, y) x a real thing y a real thing (this.towers[x] undefined || this.towers[y] === undefined)

  isValidMove(startTowerIdx, endTowerIdx) {

    if (endTowerIdx >= this.towers.length  || startTowerIdx >= this.towers.length) {
      // console.log(endTowerIdx, startTowerIdx, this.towers.length)
      return false;
    }

    let endTower = this.towers[endTowerIdx]
    let startTower = this.towers[startTowerIdx]

    if (startTowerIdx === endTowerIdx) {
      return false;
    } else if (startTower.length === 0) {
      return false;
    }

    if(endTower.length === 0) {
      return true;
    } else if(endTower[endTower.length-1] > startTower[startTower.length-1]) {
      return true;
    }

    return false;
  }

  move(startTowerIdx, endTowerIdx) {
    if(!this.isValidMove(startTowerIdx, endTowerIdx)) {
      return false
    }
    let endTower = this.towers[endTowerIdx]
    let startTower = this.towers[startTowerIdx]

    endTower.push(startTower.pop())
    return true;


  }

  isWon() {
    if (this.towers[1].length === 3 || this.towers[2].length === 3 ) return true;
    return false;
  }

  // the below methods are complete and do not need to be modified
  print() {
    // will print our board nicely to our user
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", start => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", end => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      // if the move is invalid we tell the user
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}

const newGame = new HanoiGame()

newGame.isValidMove(4, 1)

module.exports = HanoiGame;
