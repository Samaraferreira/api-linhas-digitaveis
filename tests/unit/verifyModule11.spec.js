const verifyModule11 = require('../../src/utils/verifyModule11');

describe('Verify module 11', () => {
  it('Should return digit', async () => {
    const block = '0339843800000656209197794600990100153490104';
    const digit = 5;

    expect(verifyModule11.verify(block, digit)).toBe(5);
  });

  it('Should return error', async () => {
    function verifyModule() {
      const block = '0339843800000656209197794600990100153490104';
      const digit = 6;
      verifyModule11.verify(block, digit);
    }

    expect(verifyModule).toThrowError(new Error('Dígito verificador inválido'));
  });
});
