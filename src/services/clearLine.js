const cleanLine = line => {
  return line.replace(/( |-|\.)/g, '');
};

const getBoletoType = line => {
  switch (line.length) {
    case 47:
      return 'titulo';
    case 48:
      return 'ficha';
    default:
      throw new Error('Linha não possui quantidade de números válida');
  }
};

module.exports = { cleanLine, getBoletoType };
