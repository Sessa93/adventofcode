'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split(' ').map(v => parseInt(v))
}

const sumMeta = (input, cursor) => {
    const nChild = input[cursor]
    const nMeta = input[cursor+1]

    if (nChild === 0) {
        let nodeTotal = 0
        for (let m = 0; m < nMeta; m++) {
            nodeTotal += input[cursor+2+m]
        }
        return { childTotal: nodeTotal, lastCursor: nMeta+cursor+2 }
    }

    let childsTotal = 0
    let lastCursor = cursor+2
    for (let c = 0; c < nChild; c++) {
        const retObj = sumMeta(input, lastCursor)
        const childTotal = retObj.childTotal
        lastCursor = retObj.lastCursor

        childsTotal += childTotal
    }

    // Process node remaining metas
    let nodeTotal = 0
    for (let m = 0; m < nMeta; m++) {
        nodeTotal += input[lastCursor+m]
    }
    return { childTotal: nodeTotal+childsTotal, lastCursor: nMeta+lastCursor }
}

const getRootValue = (input, cursor) => {
    const nChild = input[cursor]
    const nMeta = input[cursor+1]

    if (nChild === 0) {
        let nodeTotal = 0
        for (let m = 0; m < nMeta; m++) {
            nodeTotal += input[cursor+2+m]
        }
        return { value: nodeTotal, lastCursor: nMeta+cursor+2 }
    }

    let childs = {}
    let lastCursor = cursor+2
    for (let c = 0; c < nChild; c++) {
        const retObj = getRootValue(input, lastCursor)
        const childValue = retObj.value
        lastCursor = retObj.lastCursor

        childs[c+1] = childValue
    }

    // Process remaining metas
    let metas = []
    for (let m = 0; m < nMeta; m++) {
        metas.push(input[lastCursor+m])
    }

    let value = 0
    metas.forEach((meta) => {
        if (childs[meta]) {
            value += childs[meta]
        }
    })

    return { value: value, lastCursor: nMeta+lastCursor }
}

const getAnswer1 = (input) => {
    return sumMeta(getInput(INPUT_FILE), 0).childTotal
}

const getAnswer2 = (input) => {
    return getRootValue(getInput(INPUT_FILE), 0).value
}

console.log('Answer 1: '+getAnswer1())
console.log('Answer 2: '+getAnswer2())

