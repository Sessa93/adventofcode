'use strict'

const fs = require('fs')

const INPUT_FILE = 'input.txt'

const REACTING_UNITS = [
  'aA', 'Aa', 'bB', 'Bb', 'cC', 'Cc', 'dD', 'Dd', 'eE', 'Ee', 'fF', 'Ff', 'gG', 'Gg',
  'hH', 'Hh', 'iI', 'Ii', 'jJ', 'Jj', 'kK', 'Kk', 'lL', 'Ll', 'mM', 'Mm', 'nN', 'Nn',
  'oO', 'Oo', 'pP', 'Pp', 'qQ', 'Qq', 'rR', 'Rr', 'sS', 'Ss', 'tT', 'Tt', 'uU', 'Uu',
  'vV', 'Vv', 'wW', 'Ww', 'xX', 'Xx', 'yY', 'Yy', 'zZ', 'Zz',
];

const getInput = (filepath) => {
    return fs.readFileSync(filepath).toString().split('\n')
}

const getAnswer1 = (input) => {
  let strInput = input[0]
  let patternFound = false

  while (!patternFound) {
    patternFound = true
    REACTING_UNITS.forEach((pair) => {
      if (strInput.includes(pair)) {
        strInput = strInput.replace(pair, '');
        patternFound = false
      }
    });
  }
  return strInput
}

const getAnswer2 = (input) => {
  let units = {}

  REACTING_UNITS.forEach((pair) => {
    let tmpStr = input[0]

    tmpStr = tmpStr.replace(new RegExp(pair[0], 'g'), '')
    tmpStr = tmpStr.replace(new RegExp(pair[1], 'g'), '')

    units[pair] = getAnswer1([tmpStr, '']).length
  });
  return Object.entries(units).reduce((a, b) => a[1] < b[1] ? a : b)[1]
}

console.log('Answer 1: '+getAnswer1(getInput(INPUT_FILE)).length)
console.log('Answer 2: '+getAnswer2(getInput(INPUT_FILE)))