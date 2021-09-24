const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/user/user.model');
const sequelize = require('../../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

const validUser = {
  id: 10,
  company: 'Test Company 1',
  email: 'testuser1@mail.com',
  first_name: 'Test User 1',
  last_name: 'Test Resu 1',
  url: 'http://testurl.com',
  text: 'Test Description 1',
};

const postUser = (user = validUser, options = {}) => {
  return request(app).post('/api/1.0/users').send(user);
};

describe('POST: User Creation', () => {
  it("Returns '201 Created' when user creation is successful", async () => {
    const response = await postUser();
    expect(response.status).toBe(201);
  });

  it('Returns success message when user creation is successful', async () => {
    const response = await postUser();
    expect(response.body.message).toBe('User created successfully!');
  });

  it('Saves the user to database', async () => {
    await postUser();
    const usersList = await User.findAll();
    expect(usersList.length).toBe(1);
  });

  it('Saves all the user info to database', async () => {
    await postUser();
    const usersList = await User.findAll();
    const savedUser = usersList[0];
    expect(savedUser.id).toBe(10);
    expect(savedUser.email).toBe('testuser1@mail.com');
    expect(savedUser.first_name).toBe('Test User 1');
    expect(savedUser.last_name).toBe('Test Resu 1');
    expect(savedUser.company).toBe('Test Company 1');
    expect(savedUser.url).toBe('http://testurl.com');
    expect(savedUser.text).toBe('Test Description 1');
  });
});
