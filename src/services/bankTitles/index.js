const validations = require('./validations');
const verifyModule10 = require('../../utils/verifyModule10');
const verifyModule11 = require('../../utils/verifyModule11');
const { getExpirationDate } = require('./validations');

module.exports = {
  async check(code) {
    const codeBank = code.substring(0, 3);
    const fieldOne = code.substring(0, 9);
    const digitOne = Number(code[9]);
    const fieldTwo = code.substring(10, 20);
    const digitTwo = Number(code[20]);
    const fieldThree = code.substring(21, 31);
    const digitThree = Number(code[31]);

    const dv = Number(code[32]);
    const expirationFactor = Number(code.substring(33, 37));

    await validations.verifyBanckCode(codeBank);

    const currency = Number(code[3]); // currency

    if (currency !== 9) {
      throw new Error('Linha inválida: Código da moeda é inválido');
    }

    verifyModule10.verify(fieldOne, digitOne);
    verifyModule10.verify(fieldTwo, digitTwo);
    verifyModule10.verify(fieldThree, digitThree);

    const expirationDate = getExpirationDate(expirationFactor);

    const amount = Number(code.substring(37, 47) / 100).toFixed(2);

    // date + amount
    const field = code.substr(33);

    const sufix = fieldOne.substr(4) + fieldTwo + fieldThree;

    const block = codeBank + currency + field + sufix;

    const digitCheck = await verifyModule11.verify(block, dv);

    const barCode = codeBank + currency + digitCheck + field + sufix;

    const response = {
      barCode,
      amount,
      expirationDate,
    };

    return response;
  },
};
