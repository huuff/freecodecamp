const convertToRoman = require('./roman-numerals');

test('2 === II', () => {
  expect(convertToRoman(2)).toBe('II');
});

test('3 === III', () => {
  expect(convertToRoman(3)).toBe('III');
});

test('4 === IV', () => {
  expect(convertToRoman(4)).toBe('IV');
});

test('5 === V', () => {
  expect(convertToRoman(5)).toBe('V');
});

test('9 === IX', () => {
  expect(convertToRoman(9)).toBe('IX');
});

test('12 === XII', () => {
  expect(convertToRoman(12)).toBe('XII');
});

test('16 === XVI', () => {
  expect(convertToRoman(16)).toBe('XVI');
});

test('29 === XXIX', () => {
  expect(convertToRoman(29)).toBe('XXIX');
});

test('44 === XLIV', () => {
  expect(convertToRoman(44)).toBe('XLIV');
});

test('45 === XLV', () => {
  expect(convertToRoman(45)).toBe('XLV');
});

test('68 === LXVIII', () => {
  expect(convertToRoman(68)).toBe('LXVIII');
});

test('83 === LXXXIII', () => {
  expect(convertToRoman(83)).toBe('LXXXIII');
});

test('97 === XCVII', () => {
  expect(convertToRoman(97)).toBe('XCVII');
});

test('99 === XCIX', () => {
  expect(convertToRoman(99)).toBe('XCIX');
});

test('400 === CD', () => {
  expect(convertToRoman(400)).toBe('CD');
});

test('500 === D', () => {
  expect(convertToRoman(500)).toBe('D');
});

test('649 === DCXLIX', () => {
  expect(convertToRoman(649)).toBe('DCXLIX');
});

test('798 === DCCXCVIII', () => {
  expect(convertToRoman(798)).toBe('DCCXCVIII');
});

test('891 === DCCCXCI', () => {
  expect(convertToRoman(891)).toBe('DCCCXCI');
});

test('1000 === M', () => {
  expect(convertToRoman(1000)).toBe('M');
});

test('1006 === MIV', () => {
  expect(convertToRoman(1006)).toBe('MVI');
});

test('1023 === MXXIII', () => {
  expect(convertToRoman(1023)).toBe('MXXIII');
});

test('2014 === MMXIV', () => {
  expect(convertToRoman(2014)).toBe('MMXIV');
});

test('3999 === MMMCMXCIX', () => {
  expect(convertToRoman(3999)).toBe('MMMCMXCIX');
});
