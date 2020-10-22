const request = require('supertest');
const app = require('../../src/app');

describe('Line', () => {
  it('Should return the correct statusCode and body when bankTitle', async () => {
    const response = await request(app).get(
      '/boleto/03399.19771 94600.990108 01534.901044 5 84380000065620',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('barCode');
  });

  it('Should return the correct statusCode and body when dealership', async () => {
    const response = await request(app).get(
      '/boleto/83620000000 5 74350003000 7 00000000321 0 30990920008 6',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('barCode');
  });

  it('Should throw Unexpected Error', async () => {
    const response = await request(app).get(
      '/boleto/03399.19778 94600.990106 01534.901044 5 84380000065620',
    );

    expect(response.status).toEqual(400);
  });
});
