'use strict'

const fs = require('fs')
const hamming = require('hamming');

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}


const getAnswer = () => {
    const strArray = getInput(INPUT_FILE).sort()

    strArray.forEach((i) => {
        strArray.forEach((j) => {
            if (hamming(i,j) === 1) {
                const res = i.split("").filter((e) => -1 !== j.split("").indexOf(e)).join("")
                if (res.length === i.length - 1) {
                    console.log(res)
                }
            }
        })
    })
    return 'Happy XMas!'
}

getAnswer()