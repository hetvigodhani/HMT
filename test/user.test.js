const request = require('supertest');
const app = require('../app'); // Assuming Express app is exported from app.js

describe('User Registration API', () => {
  it('should register a user with valid credentials', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser3',
        password: 'Password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with invalid credentials', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        username: '',
        password: '123'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
