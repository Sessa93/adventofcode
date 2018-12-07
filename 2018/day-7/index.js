'use strict'

const fs = require('fs')
const toposort = require('./toposort')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const parseInput = (input) => {
    let edges = []
    input.forEach((line) => {
        const strMatch = line.match(/Step (\w) must be finished before step (\w) can begin./)
        const before = strMatch[1]
        const after = strMatch[2]
        edges.push([before, after])
    });

    return edges
}

const getAnswer1 = () => {
    return toposort(parseInput(getInput(INPUT_FILE))).join('')
}

const getAnswer2 = () => {

}

console.log(getAnswer1())

