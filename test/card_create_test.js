const { BASE_URL } = require('./constants');

const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');
const { cardGetAll } = require('./helpers');
const request = supertest(BASE_URL);

let response;

describe('CREATE CARD', () => {
  before(async () => {
    response = await cardGetAll();
  });

  it('Create new card', async () => {
    let arrLength = response.body.length;

    let newCard = {
      description: faker.lorem.paragraphs(2),
      priority: faker.random.number({
        'min': 1,
        'max': 10
      }),
      status: faker.random.arrayElement(['todo', 'progress', 'review', 'done']),
      name: faker.commerce.productName(),
    };

    console.log(newCard)

    await request
      .post('/card')
      .send(newCard)
      .set('Accept', 'application/json');

    let responseNew;

    await request.get('/card')
      .then(res => {
        responseNew = res;
      });

    expect(responseNew.body.length).equal(arrLength + 1);
  });
});
