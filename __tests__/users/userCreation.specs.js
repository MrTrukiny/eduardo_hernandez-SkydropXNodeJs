const request = require('supertest');
const app = require('../../src/app');

describe('POST: User Creation', () => {
  it("Returns '201 Created' when user creation is successful", async () => {
    const response = await await request(app).post('/users/1').send({
      email: 'testuser1@mail.com',
      first_name: 'Test User 1',
      last_name: 'Test Resu 1',
      company: 'Test Company 1',
      url: 'http://testurl.com',
      text: 'Test Description 1',
    });
    expect(response.status).toBe(201);
  });

  it("Returns success message when user creation is successful", async () => {
    const response = await await request(app).post('/users/1').send({
      email: 'testuser1@mail.com',
      first_name: 'Test User 1',
      last_name: 'Test Resu 1',
      company: 'Test Company 1',
      url: 'http://testurl.com',
      text: 'Test Description 1',
    });
    expect(response.body.message).toBe('User created succesfully!');
  });
});
