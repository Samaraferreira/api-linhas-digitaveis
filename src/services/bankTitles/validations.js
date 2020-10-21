const axios = require('axios');

module.exports = {
  verifyBanckCode(code) {
    axios
      .get(`https://www.pagueveloz.com.br/api/v1/Bancos?codigo=${code}`)
      .catch(() => {
        throw new Error('Linha inválida: Código do banco é inválido');
      });
  },

  getExpirationDate(expirationFactor) {
    const date = new Date(1997, 9, 7);
    date.setDate(date.getDate() + expirationFactor);

    const dateFormat = new Intl.DateTimeFormat('pt-br').format(date);

    return dateFormat;
  },
};
