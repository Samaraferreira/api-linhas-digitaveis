const validations = require('./validations');
const verifyModule10 = require('../../utils/verifyModule10');
const verifyModule11 = require('../../utils/verifyModule11');
const { getExpirationDate } = require('./validations');

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

    console.log([fieldOne, digitOne]);
    console.log([fieldTwo, digitTwo]);
    console.log([fieldThree, digitThree]);
    console.log([fieldFour, digitFour]);

    // const dv = Number(code[32]);
    const expirationFactor = Number(code.substring(19, 27));

    // await validations.verifyBanckCode(codeBank);

    if (idProduct !== 8) {
      throw new Error('Constante para identificar arrecadação inválida');
    }

    if (Number(code[2]) === 6 || Number(code[2]) === 7) {
      verifyModule10.verify(fieldOne, digitOne);
      verifyModule10.verify(fieldTwo, digitTwo);
      verifyModule10.verify(fieldThree, digitThree);
      verifyModule10.verify(fieldFour, digitFour);
    } else {
      verifyModule11.verify(fieldOne, digitOne);
      verifyModule11.verify(fieldTwo, digitTwo);
      verifyModule11.verify(fieldThree, digitThree);
      verifyModule11.verify(fieldFour, digitFour);
    }

    // const expirationDate = getExpirationDate(expirationFactor);

    const barCode = fieldOne + fieldTwo + fieldThree + fieldFour;
    console.log(barCode);
    let amount = 0;

    if (Number(code[2]) === 6 || Number(code[2]) === 8) {
      amount = Number(code.substring(5, 15) / 100).toFixed(2);
    }

    // // date + amount
    // const field = code.substr(33);

    // const sufix = fieldOne.substr(4) + fieldTwo + fieldThree;

    // const block = codeBank + currency + field + sufix;

    // const digitCheck = await verifyModule11.verify(block, dv);

    const response = {
      amount,
    };

    return response;
  },
};
