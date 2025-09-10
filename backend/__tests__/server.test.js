const request = require('supertest');
const app = require('../server'); // Make sure your server.js exports the app

describe('Basic API Tests', () => {
  test('GET /api/health should return status 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.status).toBe(404);
  });
});