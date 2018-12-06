'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const parseInput = (input) => {
    let points = []
    let count = 0
    getInput(input).forEach((line) => {
        points.push({
            id: count,
            x: parseInt(line.split(',')[0]),
            y: parseInt(line.split(',')[1])
        }) 
        count++
    })
    return points
}

const getDistance = (p1, p2) => {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}

const getAnswer1 = () => {
    let grid = Object.create(null);
    let points = parseInput(INPUT_FILE)

    for(let i = 0; i < 400; i++) {
        for (let j = 0; j < 400; j++) {
            let minDist = getDistance(points[0], { x: i, y: j })
            grid[`${i},${j}`] = points[0].id

            points.slice(1).forEach((point) => {
                const dist = getDistance(point, { x: i, y: j })
                if (dist < minDist) {
                    minDist = dist
                    grid[`${i},${j}`] = point.id
                } else if (dist === minDist) {
                    grid[`${i},${j}`] = -1
                }
            })
        }
    }

    let infiniteIds = []
    for(let i = 0; i < 400; i++) {
        for (let j = 0; j < 400; j++) {
            if (j === 0 || i === 399 || j === 399 || i === 0) {
                let id = grid[`${i},${j}`]
                if (!infiniteIds.includes(id)) {
                    infiniteIds.push(id)
                }
            }
        }
    }

    let areas = {}
    for(let i = 0; i < 400; i++) {
        for (let j = 0; j < 400; j++) {
            let id = grid[`${i},${j}`]
            if (!infiniteIds.includes(id)) {
                if (areas[id]) {
                    areas[id]++
                } else {
                    areas[id] = 1
                }
            }
        }
    }

    return Object.entries(areas).reduce((a, b) => a[1] > b[1] ? a : b)[1]
}

const getAnswer2 = (N) => {
    let locations = 0
    let points = parseInput(INPUT_FILE)

    for(let i = 0; i < 400; i++) {
        for (let j = 0; j < 400; j++) {
            let total = 0
            points.forEach((point) => {
                const dist = getDistance(point, { x: i, y: j })
                total += dist
            })

            if (total < N) {
                locations++
            }
        }
    }
    return locations
}

console.log('Answer 1: '+getAnswer1())
console.log('Answer 2: '+getAnswer2(10000))