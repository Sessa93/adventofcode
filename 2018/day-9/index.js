'use strict'

const fs = require('fs')
var Deque = require("double-ended-queue");

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    const stringMatch = fs.readFileSync(filepath).toString().match(/(\d+) players; last marble is worth (\d+) points/)
    return {
        nPlayers: stringMatch[1],
        lastMarblePoints: stringMatch[2]
    }
}

const append = (value, marble) => {
    const toAdd = {
        value,
        p: marble,
        n: marble.n,
    };
    marble.n.p = toAdd;
    marble.n = toAdd;
    return toAdd;
};

const runGame = (input, multiplier) => {
    const nPlayers = input.nPlayers
    const marbleScore = input.lastMarblePoints
    const scores = {}

    let currentPlayer = 1
    let current = { value: 0 }
    current.n = current
    current.p = current
    
    for (let m = 1; m <= marbleScore*multiplier; m++) {
        if (m % 23 === 0) {
            if (scores[currentPlayer]) scores[currentPlayer] += m 
            else { scores[currentPlayer] = m }

            current = current.p.p.p.p.p.p

            if (scores[currentPlayer]) scores[currentPlayer] += current.p.value 
            else { scores[currentPlayer] = current.p.value  }

            current.p.p.n = current
            current.p = current.p.p
        } else {
            current = append(m, current.n)
        }
        currentPlayer = currentPlayer % nPlayers + 1
    }
    
    return Math.max(...Object.values(scores))
}

console.log('Answer 1: '+runGame(getInput(INPUT_FILE),1))
console.log('Answer 2: '+runGame(getInput(INPUT_FILE),100))


