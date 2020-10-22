const verifyModule10 = require('../../src/utils/verifyModule10');

describe('Verify module 10', () => {
  it('Should return true', async () => {
    const field = '033991977';
    const digit = 1;

    expect(verifyModule10.verify(field, digit)).toBeTruthy();
  });

  it('Should return error', async () => {
    function verifyModule() {
      const field = '83620000009';
      const digit = 5;
      verifyModule10.verify(field, digit);
    }

    expect(verifyModule).toThrowError(new Error('Dígito verificador inválido'));
  });
});
