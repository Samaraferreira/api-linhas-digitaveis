const cleanLine = line => {
  return line.replace(/( |-|\.)/g, '');
};

const verifyBoletoType = line => {
  switch (line.length) {
    case 47:
      return 'titulo';
    case 48:
      return 'ficha';
    default:
      return null;
  }
};

module.exports = { cleanLine, verifyBoletoType };
