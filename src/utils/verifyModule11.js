function verify(field, digit) {
  let seq = 2;
  let sum = 0;

  for (let i = field.length - 1; i >= 0; --i) {
    let result = parseInt(field[i]) * seq;

    sum += result;

    if (seq === 9) {
      seq = 1;
    }

    ++seq;
  }

  const rest = sum % 11;

  let digitCheck;

  if (rest === 0 || rest === 1) {
    digitCheck = 0;
  } else if (rest === 10) {
    digitCheck = 1;
  } else {
    digitCheck = 11 - rest;
  }

  if (digitCheck !== digit) {
    throw new Error('Dígito verificador inválido');
  }

  return digitCheck;
}

module.exports = {
  verify,
};
