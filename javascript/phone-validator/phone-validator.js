const regex1 = /^\d{3}-\d{3}-\d{4}$/;
const regex2 = /^\(\d{3}\)\s?\d{3}-\d{4}$/;
const regex3 = /^\d{3} \d{3} \d{4}$/;
const regex4 = /^\d{10}$/;
const regex5 = /^\d \d{3} \d{3} \d{4}$/;
const regex6 = /^1\s?\(\d{3}\)\s?\d{3}-\d{4}$/;
const regex7 = /^1 \d{3}-\d{3}-\d{4}$/;

function telephoneCheck(str) {

  const regexArray = [ regex1, regex2, regex3, regex4, regex5, regex6, regex7 ];

  return regexArray.some(regex => regex.test(str));
}

module.exports = telephoneCheck;

