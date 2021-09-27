function makeGetUsers({ readUsers }) {
  return async function getUsers(httpRequest) {
    const {
      params: { userIds },
      pagination,
    } = httpRequest || {};

    const usersList = await readUsers({ userIds: userIds?.split(','), pagination });
    return {
      response: {
        statusCode: 200,
        body: {
          ...usersList,
        },
      },
    };
  };
}

module.exports = makeGetUsers;
