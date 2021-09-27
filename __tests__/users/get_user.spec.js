const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/user/models/user.model');
const sequelize = require('../../src/config/database');

beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') {
    await sequelize.sync();
  }
});

beforeEach(async () => {
  await User.destroy({ truncate: true, restartIdentity: true });
  if (process.env.NODE_ENV === 'test') {
    await sequelize.query("DELETE FROM `sqlite_sequence` WHERE `name` = 'users'");
  }
});

const getUsers = (options = {}) => {
  const agent = request(app);
  if (options.userIds) {
    return agent.get('/api/1.0/users/' + options.userIds.join(', '));
  }
  return agent.get('/api/1.0/users');
};

const addUsers = async (totalUsers = 11) => {
  for (let i = 1; i <= totalUsers; i++) {
    await User.create({
      company: `Test Company ${i}`,
      email: `testuser${i}updated@mail.com`,
      first_name: `Test User ${i}`,
      last_name: `Test Resu ${i}`,
      url: `http://testurl${i}.com`,
      text: `Test Description ${i}`,
    });
  }
};

describe('GET: Users List', () => {
  it("Returns '200 Ok' when there are no users in database", async () => {
    const response = await getUsers();
    expect(response.status).toBe(200);
  });

  it('Returns data and pagination objects as response body', async () => {
    const response = await getUsers();
    expect(response.body).toEqual({
      data: [],
      pagination: {
        page: 1,
        total: 0,
        totalPages: 0,
      },
    });
  });

  it('Returns 10 users in page when there are 11 or more users in database', async () => {
    await addUsers();
    const response = await getUsers();
    expect(response.body.data.length).toBe(10);
  });

  it('Returns all the info in data array for each user', async () => {
    await addUsers(11);
    const response = await getUsers();
    const user = response.body.data[0];
    expect(Object.keys(user)).toEqual([
      'id',
      'company',
      'email',
      'first_name',
      'last_name',
      'text',
      'url',
    ]);
  });

  it('Returns 1 user giving one userIds param into request', async () => {
    await User.create({
      id: 10,
      company: 'Test Company 1',
      email: 'testuser1@mail.com',
      first_name: 'Test User 1',
      last_name: 'Test Resu 1',
      url: 'http://testurl.com',
      text: 'Test Description 1',
    });
    const userIds = [10];
    const response = await getUsers({ userIds });
    const user = response.body.data[0];
    expect(user.id).toBe(10);
  });

  it('Returns  users giving four userIds param into request', async () => {
    await addUsers(11);
    const userIds = [10, 1, 3, 7];
    const response = await getUsers({ userIds });
    const user10 = response.body.data[0];
    const user1 = response.body.data[1];
    const user3 = response.body.data[2];
    const user7 = response.body.data[3];
    expect(user10.id).toBe(10);
    expect(user1.id).toBe(7);
    expect(user3.id).toBe(3);
    expect(user7.id).toBe(1);
  });

  it.each`
    userIds      | sort            | order
    ${[5, 3, 1]} | ${'id'}         | ${'ASC'}
    ${[3, 5, 1]} | ${'id'}         | ${'DESC'}
    ${''}        | ${'id'}         | ${''}
    ${[5, 3, 1]} | ${'email'}      | ${'ASC'}
    ${[3, 5, 1]} | ${'email'}      | ${'DESC'}
    ${''}        | ${'email'}      | ${''}
    ${[5, 3, 1]} | ${'company'}    | ${'ASC'}
    ${[3, 5, 1]} | ${'company'}    | ${'DESC'}
    ${''}        | ${'company'}    | ${''}
    ${[5, 3, 1]} | ${'first_name'} | ${'ASC'}
    ${[3, 5, 1]} | ${'first_name'} | ${'DESC'}
    ${''}        | ${'first_name'} | ${''}
    ${[5, 3, 1]} | ${'last_name'}  | ${'ASC'}
    ${[3, 5, 1]} | ${'last_name'}  | ${'DESC'}
    ${''}        | ${'last_name'}  | ${''}
    ${[5, 3, 1]} | ${'text'}       | ${'ASC'}
    ${[3, 5, 1]} | ${'text'}       | ${'DESC'}
    ${''}        | ${'text'}       | ${''}
    ${[5, 3, 1]} | ${'url'}        | ${'ASC'}
    ${[3, 5, 1]} | ${'url'}        | ${'DESC'}
    ${''}        | ${'url'}        | ${''}
  `(
    "Returns users list by '$userIds', ordering by '$sort' and order '$order'",
    async ({ userIds, sort, order }) => {
      await addUsers(5);
      const response = await request(app).get(
        `/api/1.0/users${userIds && `/${userIds.join(', ')}`}?sort_by=${sort}${
          order && `&order=${order}`
        }`,
      );
      const usersList = response.body.data;
      if (order === 'ASC') {
        expect(usersList[0].id).toBe(1);
      }

      if (order === 'DESC' || !order) {
        expect(usersList[0].id).toBe(5);
      }
    },
  );
});
