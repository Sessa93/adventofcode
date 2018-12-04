'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const parseInput = (rawInput) => {
    let sleepTimes = {}
    let totalSleepTimes = {}

    let guard, start, end 
    rawInput.forEach((line) => {
        if (line != '') {
            let strMatch = line.match(/\[\d{4}-\d{2}-\d{2} \d{2}:(\d{2})\]/)

            if (line.includes('Guard')) {
                guard = line.match(/#(\d+)/)[1]
            } else if (line.includes('falls')) {
                start = parseInt(strMatch[1])
            } else {
                end = parseInt(strMatch[1])

                if (sleepTimes[guard]) {
                    let minutes = sleepTimes[guard]
                    minutes.push({ start, end })
                } else {
                    sleepTimes[guard] = [{ start, end }]
                }

                if (totalSleepTimes[guard]) {
                    totalSleepTimes[guard] += (end - start)
                } else {
                    totalSleepTimes[guard] = (end - start)
                }
            }
        }
    });

    return {
        sleepTimes,
        totalSleepTimes
    }
}

const getGuardId = (parsedInput) => {
    return Object.entries(parsedInput.totalSleepTimes).reduce((a, b) => a[1] > b[1] ? a : b)[0]
}

const getMinute = (guardId, parsedInput) => {
    let minutes = {}
    let intervals = parsedInput.sleepTimes[guardId]
    for (let m = 0; m < 60; m++) {
        intervals.forEach((i) => {
            if (m >= i.start && m < i.end) {
                if (minutes[m]) {
                    minutes[m] += 1
                } else {
                    minutes[m] = 1
                }
            }
        })
    }
    return { 
        min: Object.entries(minutes).reduce((a, b) => a[1] > b[1] ? a : b)[0],
        n: Object.entries(minutes).reduce((a, b) => a[1] > b[1] ? a : b)[1]
    }
}

const getAnswer1 = (guardId, minute) => {
    return guardId*minute
}

const getAnswer2 = (parsedInput) => {
    let guards = {}
    let max_guard = 0, max_min = 0, max_n = 0
    Object.keys(parsedInput.sleepTimes).forEach((guard) => {
        let { min, n } = getMinute(guard, parsedInput)
        if (n > max_n) {
            max_guard = guard
            max_min = min
            max_n = n
        }
    })
    return max_min*max_guard
}



const parsedInput = parseInput(getInput(INPUT_FILE))
const guardId = getGuardId(parsedInput)

console.log('Answer 1: '+getAnswer1(guardId, getMinute(guardId, parsedInput).min))
console.log('Answer 2: '+getAnswer2(parsedInput))
