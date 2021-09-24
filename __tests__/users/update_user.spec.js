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

const validUpdate = {
  company: 'Test Company 1 Updated',
  email: 'testuser1updated@mail.com',
  first_name: 'Test User 1 Updated',
  last_name: 'Test Resu 1 Updated',
  url: 'http://testurl.updated.com',
  text: 'Test Description 1 Updated',
};

const addUser = async (user = { ...validUser }) => {
  return User.create(user);
};

const putUser = async (id = 10, body = null, options = {}) => {
  let agent = request(app).put('/api/1.0/users/' + id);
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  const response = await agent.send(body);
  return response;
};

describe('PUT: User Update', () => {
  it("Returns '200 Ok' when valid update request sent from authorized user", async () => {
    const savedUser = await addUser();
    const response = await putUser(savedUser.id, validUpdate);
    expect(response.status).toBe(200);
  });

  it('Returns success message when user update is successful', async () => {
    const savedUser = await addUser();
    const response = await putUser(savedUser.id, validUpdate);
    expect(response.body.message).toBe('USER_UPDATED');
  });

  it('Updates all the updated user info sent into database', async () => {
    const savedUser = await addUser();
    await putUser(savedUser.id, validUpdate);
    const usersList = await User.findAll();
    const updatedUser = usersList[0];
    expect(updatedUser.id).toBe(10);
    expect(updatedUser.email).toBe('testuser1updated@mail.com');
    expect(updatedUser.first_name).toBe('Test User 1 Updated');
    expect(updatedUser.last_name).toBe('Test Resu 1 Updated');
    expect(updatedUser.company).toBe('Test Company 1 Updated');
    expect(updatedUser.url).toBe('http://testurl.updated.com');
    expect(updatedUser.text).toBe('Test Description 1 Updated');
  });
});
