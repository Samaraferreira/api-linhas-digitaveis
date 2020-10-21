function verify(field, digit) {
  let seq = 2;
  let sum = 0;

  for (let i = field.length - 1; i >= 0; --i) {
    let result = parseInt(field[i]) * seq;

    if (result >= 10) {
      result = 1 + (result % 10);
    }

    if (seq === 2) {
      seq -= 1;
    } else {
      seq += 1;
    }

    sum += result;
  }

  let digitCheck = 10 - (sum % 10);

  if (digitCheck === 10) {
    digitCheck = 0;
  }

  if (digitCheck !== digit) {
    throw new Error('Dígito verificador inválido');
  }

  return true;
}

module.exports = {
  verify,
};
