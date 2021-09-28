const reqresAPI = require('../../shared/apis/reqres.api');
const { pendingUserDAO } = require('../data_access');

module.exports = async function createUsersUsingReqresAPIInfo(
  userIdsReq = [],
  userIdsRes = [],
  createUser,
) {
  // Reqres only have 12 users!!, so I'm going to apply a filter for userIds <= 12.
  let userIdsNotFound =
    userIdsReq &&
    // I will remove 12 validation with the intention of see pending users cronjob working.
    // userIdsReq.filter((userId) => !userIdsRes.includes(Number(userId)) && userId <= 12);
    userIdsReq.filter((userId) => !userIdsRes.includes(Number(userId)));

  // Get Users from ReqresAPI.
  const usersFromReqres =
    userIdsNotFound &&
    (await Promise.allSettled(
      userIdsNotFound.map(async (userId) => {
        // This lines were created for testing cronjob when an user id couldn't be created.
        // const userIdsNotAllowed = ['9', '10', '11', '12'];
        // if (userIdsNotAllowed.includes(userId)) {
        //   throw Error();
        // }
        return reqresAPI.getUser(userId);
      }),
    ));

  // Prepare Users Data for create them into DB.
  const usersToCreate =
    Array.isArray(usersFromReqres) &&
    usersFromReqres
      .filter((user) => user.status === 'fulfilled')
      .map((user) => {
        const { avatar, ...userData } = user.value.data;
        return {
          ...userData,
          url: avatar,
        };
      });

  // Create Users into our DB in parallel.
  usersToCreate &&
    (await Promise.allSettled(
      usersToCreate.map(async (userData) => {
        await createUser({ ...userData });
      }),
    ));

  // Prepare IDs of users that couldn't be got from Reqres.
  const usersFailedFromReqres =
    Array.isArray(usersToCreate) &&
    Array.isArray(userIdsNotFound) &&
    userIdsNotFound.filter(
      (userId) => !usersToCreate.map(({ id }) => id).includes(Number(userId)),
    );

  // Save or update Pending User Ids into DB for future creation.
  const pendingUserIds = await pendingUserDAO.findById({ userId: 1 });
  if (pendingUserIds && usersFailedFromReqres.length) {
    await pendingUserDAO.update({
      userId: 1,
      pending_ids: usersFailedFromReqres.join(', '),
    });
  }
  if (!pendingUserIds && usersFailedFromReqres.length) {
    await pendingUserDAO.save({ id: 1, pending_ids: usersFailedFromReqres.join(', ') });
  }

  return usersFailedFromReqres;
};
