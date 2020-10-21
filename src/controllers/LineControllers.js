const { cleanLine, verifyBoletoType } = require('../services/cleanLine');
const bankTitles = require('../services/bankTitles');
const dealership = require('../services/dealership');

module.exports = {
  async index(request, response) {
    const { line } = request.params;

    try {
      const boletoCode = cleanLine(line); // limpar

      if (isNaN(Number(boletoCode))) {
        // verify number
        throw new Error('Linha inválida: não contém apenas números');
      }

      const boletoType = verifyBoletoType(boletoCode); // boleto type

      if (!boletoType) {
        throw new Error(
          'Linha inválida: não possui quantidade de números válida',
        );
      }

      let boletoChecked = null;

      switch (boletoType) {
        case 'titulo':
          boletoChecked = await bankTitles.check(boletoCode);
          return response.status(200).json(boletoChecked);
        case 'ficha':
          boletoChecked = await dealership.check(boletoCode);
          return response.status(200).json(boletoChecked);
        default:
          response.status(400).json({ message: 'A linha digita é inválida' });
      }
    } catch (err) {
      return response.status(400).json(err.message);
    }
  },
};
