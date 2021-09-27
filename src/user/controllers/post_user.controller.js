function makePostUser({ createUser }) {
  return async function postUser(httpRequest) {
    const { body } = httpRequest;
    const { userId } = httpRequest.params;
    await createUser({ ...body, id: userId || body.id });
    return {
      response: {
        statusCode: 201,
        body: {
          message: 'USER_CREATED',
        },
      },
    };
  };
}

module.exports = makePostUser;
