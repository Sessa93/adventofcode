'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const getAnswer = (inputFrequency) => {
    getInput(INPUT_FILE).forEach(offset => {
        if (offset != '') {
            inputFrequency += parseInt(offset)
        }
    })
    return inputFrequency
}

console.log(getAnswer(0))