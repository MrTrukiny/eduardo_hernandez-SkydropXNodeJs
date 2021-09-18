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

  it('Returns success message when user creation is successful', async () => {
    const response = await await request(app).post('/users/1').send({
      email: 'testuser1@mail.com',
      first_name: 'Test User 1',
      last_name: 'Test Resu 1',
      company: 'Test Company 1',
      url: 'http://testurl.com',
      text: 'Test Description 1',
    });
    expect(response.body.message).toBe('User created successfully!');
  });

  it('Saves the user to database', async () => {
    await request(app).post('/users/1').send({
      email: 'testuser1@mail.com',
      first_name: 'Test User 1',
      last_name: 'Test Resu 1',
      company: 'Test Company 1',
      url: 'http://testurl.com',
      text: 'Test Description 1',
    });
    // Query User
    const usersList = await User.findAll();
    expect(usersList.length).toBe(1);
  });

  it('Saves all the user info to database', async () => {
    await request(app).post('/users/1').send({
      email: 'testuser1@mail.com',
      first_name: 'Test User 1',
      last_name: 'Test Resu 1',
      company: 'Test Company 1',
      url: 'http://testurl.com',
      text: 'Test Description 1',
    });
    const usersList = await User.findAll();
    const savedUser = usersList[0];
    expect(savedUser.email).toBe('testuser1@mail.com');
    expect(savedUser.firstName).toBe('Test User 1');
    expect(savedUser.lastName).toBe('Test Resu 1');
    expect(savedUser.company).toBe('Test Company 1');
    expect(savedUser.url).toBe('http://testurl.com');
    expect(savedUser.text).toBe('Test Description 1');
  });
});
