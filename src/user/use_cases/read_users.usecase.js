const createUsersUsingReqresAPIInfo = require('../hooks/create_users_using_reqres_info');

module.exports = function makeReadUsers({ listUsers, createUser }) {
  return async function readUsers({ userIds, pagination }) {
    const { page, size, sort_by, order } = pagination;

    const usersList = await listUsers({
      order,
      page,
      size,
      sort_by,
      userIds,
    });

    // Get IDs of existent Users in DB.
    const usersListIds = usersList.data.map(({ id }) => id);

    // Create Users not Existent in DB.
    createUsersUsingReqresAPIInfo(userIds, usersListIds, createUser).catch((error) =>
      // TODO: Log this error
      console.log(error),
    );

    return usersList;
  };
};
