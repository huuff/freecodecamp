function charRot13Backwards(character) {
  let asciiCode = character.codePointAt(0);
  asciiCode -= 65;
  asciiCode -= 13;
  if (asciiCode < 0) {
    asciiCode += 91;
  } else {
    asciiCode += 65;
  }
  return String.fromCodePoint(asciiCode);
}

function rot13(str) {
  const array = [...str];
  const regex = /[A-Z]/;
  
  let result = [];
  for (const character of array) {
    if (regex.test(character)) {
      result.push(charRot13Backwards(character));
    } else {
      result.push(character);
    }
  }
  
  return result.join("");
}

module.exports = rot13;
