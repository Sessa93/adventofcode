'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const getAnswer = (inputFrequency) => {
    let found = false
    let foundFreqs = [inputFrequency]
    while (!found) {
        getInput(INPUT_FILE).forEach(offset => {
            if (offset != '' && !found) {
                inputFrequency += parseInt(offset)

                if (foundFreqs.includes(inputFrequency)) {
                    found = true
                }
                foundFreqs.push(inputFrequency)
            }
        })
    }
    return inputFrequency
}

console.log(getAnswer(0))