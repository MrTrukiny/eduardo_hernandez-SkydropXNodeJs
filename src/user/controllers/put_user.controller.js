function makePutUser({ updateUser }) {
  return async function putUser(httpRequest) {
    const { body } = httpRequest;
    const { userId } = httpRequest.params;

    await updateUser({ ...body, id: userId });
    return {
      response: {
        statusCode: 200,
        body: {
          message: 'USER_UPDATED',
        },
      },
    };
  };
}

module.exports = makePutUser;
