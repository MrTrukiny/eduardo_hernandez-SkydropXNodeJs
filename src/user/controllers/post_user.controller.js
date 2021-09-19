function makePostUser({ createUser }) {
  return async function postUser(httpRequest) {
    const { body } = httpRequest;
    await createUser({ ...body });
    return {
      response: {
        statusCode: 201,
        body: {
          message: 'User created successfully!',
        },
      },
    };
  };
}

module.exports = makePostUser;
