const { BASE_URL } = require('./constants');
const { cardDeleteAll, cardGetAll } = require( './helpers');

const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');
const request = supertest(BASE_URL);

let response;

// let cardsId = []

describe('GET ALL CARDS', () => {

  before(async () => {
     await cardDeleteAll();
     response = await cardGetAll();
  });

  it('should return 200 response', () => {
    expect(response.status).equal(200);
  });

  it('should return 200 response 1', () => {
    expect(response.body).to.be.an('array');
  });

  it('should return 200 response 2', async () => {
    let isError = false;

    response.body.forEach(el => {
      if (!(el.hasOwnProperty('priority') && el.hasOwnProperty('description') && el.hasOwnProperty('name'))) {
        isError = true;
      }

    });

    expect(isError).eq(false);
  });
});
