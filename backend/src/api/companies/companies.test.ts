import request from 'supertest';

import app from '../../app';
import { Companies } from './companies.model';

beforeAll(async () => {
  try {
    await Companies.drop(); 
  } catch (error) {}
});

describe('GET /api/v1/companies', () => {
  it('responds with an array of companies', async () =>
    request(app)
      .get('/api/v1/companies')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }),
  );
});

let id = '';
describe('POST /api/v1/companies', () => {
  it('responds with an error if company is invalid', async () =>
    request(app)
      .post('/api/v1/companies')
      .set('Accept', 'application/json')
      .send({companyName: '',})
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {        
        expect(response.body).toHaveProperty('message');
      }),
  );
  it('responds with an object', async () =>
    request(app)
      .post('/api/v1/companies')
      .set('Accept', 'application/json')
      .send({
        companyName: 'Test Company',
        legalNumber: 123456,
        country: 'Somewhere'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body).toHaveProperty('companyName');
        expect(response.body).toHaveProperty('legalNumber');
        expect(response.body).toHaveProperty('country');
      }),
  );
});

describe('GET /api/v1/companies/:id', () => {
  it('responds with a company', async () =>
    request(app)
      .get(`/api/v1/companies/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('companyName');
        expect(response.body).toHaveProperty('legalNumber');
        expect(response.body).toHaveProperty('country');
      }),
  );
  it('responds with a ObjectId error', (done) =>{
  request(app)
    .get(`/api/v1/companies/asdfasdasdf`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(422,done)
    }
  );
  it('responds with a not found error', (done) =>{
    request(app)
      .get(`/api/v1/companies/645bf4c438b5d8d38b2eb811`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
    })
});

describe('PUT /api/v1/companies/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/companies/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/companies/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        companyName: 'Updated Company',
        legalNumber: 999999,
        country: 'Somewhere Updated'
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a single company', async () =>
    request(app)
      .put(`/api/v1/companies/${id}`)
      .set('Accept', 'application/json')
      .send({
        companyName: 'Updated Company',
        legalNumber: 999999,
        country: 'Somewhere Updated'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('companyName');
        expect(response.body).toHaveProperty('legalNumber');
        expect(response.body).toHaveProperty('country');
        expect(response.body.legalNumber).toBe(999999);
      }),
  );
});

describe('DELETE /api/v1/companies/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/companies/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/companies/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
  it('responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/v1/companies/${id}`)
      .expect(204, done);
  });
  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/companies/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});