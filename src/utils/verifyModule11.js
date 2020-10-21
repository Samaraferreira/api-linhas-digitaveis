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

  let digitCheck = 11 - (sum % 11);

  if (digitCheck === 0 || digitCheck === 10 || digitCheck === 11) {
    digitCheck = 1;
  }

  if (digitCheck !== digit) {
    throw new Error('Dígito verificador inválido');
  }

  return digitCheck;
}

module.exports = {
  verify,
};
