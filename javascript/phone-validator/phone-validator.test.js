const telephoneCheck = require('./phone-validator');

test('should return a boolean', () => {
  expect(typeof(telephoneCheck('555-555-5555'))).toBe("boolean");
});

test('1 555-555-5555 valid', () => {
  expect(telephoneCheck('1 555-555-5555')).toBe(true);
});

test('1 (555) 555-5555 valid', () => {
  expect(telephoneCheck('1 (555) 555-5555')).toBe(true);
});

test('5555555555 valid', () => {
  expect(telephoneCheck('5555555555')).toBe(true);
});

test('555-555-5555 valid', () => {
  expect(telephoneCheck('555-555-5555')).toBe(true);
});

test('(555)555-5555 valid', () => {
  expect(telephoneCheck('(555)555-5555')).toBe(true);
});

test('1(555)555-5555 valid', () => {
  expect(telephoneCheck('1(555)555-5555')).toBe(true);
});

test('555-5555 invalid', () => {
  expect(telephoneCheck('555-5555')).toBe(false);
});

test('1 555)555-5555 invalid', () => {
  expect(telephoneCheck('1 555)555-5555')).toBe(false);
});

test('1 555 555 5555 valid', () => {
  expect(telephoneCheck('1 555 555 5555')).toBe(true);
});

test('1 456 789 4444 valid', () => {
  expect(telephoneCheck('1 456 789 4444')).toBe(true);
});

test('123**&!!asdf# invalid', () => {
  expect(telephoneCheck('123**&!!asdf#')).toBe(false);
});

test('55555555 invalid', () => {
  expect(telephoneCheck('55555555')).toBe(false);
});

test('(6054756961) invalid', () => {
  expect(telephoneCheck('(6054756961)')).toBe(false);
});

test('2 (757) 622-7382 invalid', () => {
  expect(telephoneCheck('2 (757) 622-7382')).toBe(false);
});

test('0 (757) 622-7382 invalid', () => {
  expect(telephoneCheck('0 (757) 622-7382')).toBe(false);
});

test('-1 (757) 622-7382 invalid', () => {
  expect(telephoneCheck('-1 (757) 622-7382')).toBe(false);
});

test('2 757 622-7382 invalid', () => {
  expect(telephoneCheck('2 757 622-7382')).toBe(false);
});

test('10 (757) 622-7382 invalid', () => {
  expect(telephoneCheck('10 (757) 622-7382')).toBe(false);
});

test('27576227382 invalid', () => {
  expect(telephoneCheck('27576227382')).toBe(false);
});

test('(275)76227382 invalid', () => {
  expect(telephoneCheck('(275)76227382')).toBe(false);
});

test('2(757)6227382 invalid', () => {
  expect(telephoneCheck('2(757)6227382')).toBe(false);
});

test('2(757)622-7382 invalid', () => {
  expect(telephoneCheck('2(757)622-7382')).toBe(false);
});

test('555)-555-5555 invalid', () => {
  expect(telephoneCheck('555)-555-5555')).toBe(false);
});

test('(555-555-5555 invalid', () => {
  expect(telephoneCheck('(555-555-5555')).toBe(false);
});

test('(555)5(55?)-5555 invalid', () => {
  expect(telephoneCheck('(555)5(55?)-5555)')).toBe(false);
});

test('55 55-55-555-5 invalid', () => {
  expect(telephoneCheck('55 55-55-555-5')).toBe(false);
});
