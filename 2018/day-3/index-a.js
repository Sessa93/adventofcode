'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const parseInput = (rawInput) => {
    let parsedInput = []
    getInput(INPUT_FILE).forEach((line) => {
      if (line != '') {
        line = line.replace(/\s/g, '')
        let str1 = line.split('@')
        let id = str1[0].split('#')[1]
        let str2 = str1[1].split(':')
        let location_x = str2[0].split(',')[0]
        let location_y = str2[0].split(',')[1]
        let width = str2[1].split('x')[0]
        let height = str2[1].split('x')[1]

        let rect = {
          id,
          location_x: parseInt(location_x),
          location_y: parseInt(location_y),
          width: parseInt(width),
          height: parseInt(height)
        }

        parsedInput.push(rect)
      }
    })
    return parsedInput
}

const getAnswer = () => {
  let grid = Object.create(null);
  let rects = parseInput()

  rects.forEach((rect) => {
    for (let i = rect.location_x; i < rect.location_x + rect.width; i++) {
      for (let j = rect.location_y; j < rect.location_y + rect.height; j++) {
        grid[`${i},${j}`] = (grid[`${i},${j}`] || 0) + 1;
      }
    }
  })

  return Object.values(grid).filter((value) => {
    return value > 1
  }).length
}

console.log(getAnswer())
