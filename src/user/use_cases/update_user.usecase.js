module.exports = function makeUpdateUser({
  buildUser,
  editUser,
  findUserById,
  ErrorResponse,
}) {
  return async function updateUser({ id, ...userData }) {
    const existingUser = await findUserById({ userId: id });
    if (!existingUser) {
      throw new ErrorResponse('USER_NOT_FOUND', 404);
    }
    const userUpdated = await buildUser({
      id,
      validationType: 'updateUser',
      ...existingUser,
      ...userData,
    });
    return editUser({
      userId: userUpdated.getId(),
      company: userUpdated.getCompany(),
      email: userUpdated.getEmail(),
      first_name: userUpdated.getFirstName(),
      last_name: userUpdated.getLastName(),
      url: userUpdated.getUrl(),
      text: userUpdated.getText(),
    });
  };
};
