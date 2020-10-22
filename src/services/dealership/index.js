const verifyModule10 = require('../../utils/verifyModule10');
const verifyModule11 = require('../../utils/verifyModule11');

module.exports = {
  async check(code) {
    const idProduct = Number(code[0]);

    const fieldOne = code.substring(0, 11);
    const digitOne = Number(code[11]);
    const fieldTwo = code.substring(12, 23);
    const digitTwo = Number(code[23]);
    const fieldThree = code.substring(24, 35);
    const digitThree = Number(code[35]);
    const fieldFour = code.substring(36, 47);
    const digitFour = Number(code[47]);

    if (idProduct !== 8) {
      throw new Error('Constante para identificar arrecadação inválida');
    }

    const digit = Number(code[3]);
    const field = code.substring(0, 3) + code.substring(4, 11);

    const block = field + fieldTwo + fieldThree + fieldFour;

    if (Number(code[2]) === 6 || Number(code[2]) === 7) {
      verifyModule10.verify(fieldOne, digitOne);
      verifyModule10.verify(fieldTwo, digitTwo);
      verifyModule10.verify(fieldThree, digitThree);
      verifyModule10.verify(fieldFour, digitFour);
      verifyModule10.verify(block, digit);
    } else {
      verifyModule11.verify(fieldOne, digitOne);
      verifyModule11.verify(fieldTwo, digitTwo);
      verifyModule11.verify(fieldThree, digitThree);
      verifyModule11.verify(fieldFour, digitFour);
      verifyModule11.verify(block, digit);
    }

    const barCode = fieldOne + fieldTwo + fieldThree + fieldFour;

    const response = {
      barCode,
    };

    let amount = null;

    if (Number(barCode[2]) === 6 || Number(barCode[2]) === 8) {
      amount = Number(barCode.substring(4, 15) / 100).toFixed(2);
    }

    if (amount) {
      response.amount = amount;
    }

    return response;
  },
};
