const rot13 = require('./caesars-cipher');

test('SERR PBQR PNZC === FREE CODE CAMP', () => {
  expect(rot13('SERR PBQR PNZC')).toBe('FREE CODE CAMP');
});

test('SERR CVMMN! === FREE PIZZA!', () => {
  expect(rot13('SERR CVMMN!')).toBe('FREE PIZZA!');
});

test('SERR YBIR? === FREE LOVE?', () => {
  expect(rot13('SERR YBIR?')).toBe('FREE LOVE?');
});

test('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.', () => {
  expect(rot13('GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.')).toBe('THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.');
});
