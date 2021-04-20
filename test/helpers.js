const { BASE_URL } = require('./constants');
const supertest = require('supertest');
const request = supertest(BASE_URL);

async function cardDeleteAll() {
  const cards = (await request.get('/card')).body

  cards
    .map(card => card._id)
    .forEach(el => {
      request.delete(`/card/${el}`)
        .then(res => {
          console.log(res.body);
        })
        .catch(err => console.log(err));
    });
}

function cardGetAll() {
  return request.get('/card')
}

module.exports = {
  cardDeleteAll,
  cardGetAll,
}
