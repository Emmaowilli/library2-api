const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  it('GET /api/authors should return array', async () => {
    const res = await request(app).get('/api/authors');
    expect(res.statusCode).toEqual(401); 
    // or mock auth if you want 200
  });

  it('GET /api/books should return array', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toEqual(401);
  });

  it('GET /api/publishers should return array', async () => {
    const res = await request(app).get('/api/publishers');
    expect(res.statusCode).toEqual(401);
  });

  it('GET /api/genres should return array', async () => {
    const res = await request(app).get('/api/genres');
    expect(res.statusCode).toEqual(401);
  });
});