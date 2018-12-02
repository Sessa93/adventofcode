'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const getRepeated = (str) => {
    const result = [];
    const sortedString = str.split("").sort().join("")
    const strArr = sortedString.match(/(.)\1+/g);
    
    if (strArr != null) {
        strArr.forEach((e) => {
            const count = (sortedString.match(new RegExp(e[0], 'g')) || []).length
            result.push({ char: e[0], count });
        });
    }
    return result;
}

const getCounts = (reps, n) => {
    return reps.filter((e) => {
        return e.count === n
    }).length
}

const getAnswer = () => {
    let twos = 0
    let threes = 0

    getInput(INPUT_FILE).forEach((line) => {
        if (line != '') {
            const reps = getRepeated(line)
            if (getCounts(reps, 2) > 0) { twos++ }
            if (getCounts(reps, 3) > 0) { threes++ }
        }
    })
    return twos*threes
}

console.log(getAnswer())