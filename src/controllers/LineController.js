const { clearLine, getBoletoType } = require('../services/clearLine');
const bankTitles = require('../services/bankTitles');
const dealership = require('../services/dealership');

module.exports = {
  async index(request, response) {
    const { line } = request.params;

    try {
      const boletoCode = clearLine(line);

      if (isNaN(Number(boletoCode))) {
        throw new Error('Linha inválida: não contém apenas números');
      }

      const boletoType = getBoletoType(boletoCode);

      let boletoChecked = null;

      switch (boletoType) {
        case 'titulo':
          boletoChecked = await bankTitles.check(boletoCode);
          return response.status(200).json(boletoChecked);
        case 'ficha':
          boletoChecked = await dealership.check(boletoCode);
          return response.status(200).json(boletoChecked);
        default:
          throw new Error('A linha digitada é inválida');
      }
    } catch (err) {
      return response.status(400).json(err.message);
    }
  },
};
