const charToVal = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

function convertToRomanRec(num) {
  if (num === 0) {
    return '';
  }

  const keys = Object.keys(charToVal);

  for (let i = 0; i < keys.length; i++) {
    const currentChar = keys[i];
    const currentVal = charToVal[currentChar];
    if (num >= charToVal[keys[i]]) {
      return currentChar + convertToRomanRec(num - currentVal);
    }
  }
}

function convertToRoman(num) {
  return convertToRomanRec(num);
}

module.exports = convertToRoman;
