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

const addUser = async (user = { ...validUser }) => {
  return User.create(user);
};

const deleteUser = async (id = 5, options = {}) => {
  const agent = request(app).delete('/api/1.0/users/' + id);
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  return agent.send();
};

describe('DELETE: User Delete', () => {
  it("Returns '200 Ok' when delete request is sent", async () => {
    const savedUser = await addUser();
    const response = await deleteUser(savedUser.id);
    expect(response.status).toBe(200);
  });

  it('Returns success message when user delete is successful', async () => {
    const savedUser = await addUser();
    await deleteUser(savedUser.id);

    const inDBUser = await User.findOne({ where: { id: savedUser.id } });
    expect(inDBUser).toBeNull();
  });
});
