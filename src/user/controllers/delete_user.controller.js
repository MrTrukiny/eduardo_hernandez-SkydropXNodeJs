function makeDeleteUser({ removeUser }) {
  return async function deleteUser(httpRequest) {
    const { userId } = httpRequest.params;

    await removeUser({ userId });
    return {
      response: {
        statusCode: 200,
        body: {
          message: 'USER_DELETED',
        },
      },
    };
  };
}

module.exports = makeDeleteUser;
