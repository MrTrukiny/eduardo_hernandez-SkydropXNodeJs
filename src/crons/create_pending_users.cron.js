const { pendingUserDAO, userDAO } = require('../user/data_access');
const { createUser } = require('../user/use_cases');
const createUsersUsingReqresAPIInfo = require('../user/hooks/create_users_using_reqres_info');

module.exports = async function createPendingUsersCronjob() {
  console.log('EXECUTING PENDING USERS CRONJOB');
  const pendingUserIds = await pendingUserDAO.findById({ userId: 1 });
  // If there are not pending user ids, we stop the cronjob by returning void;

  if (!pendingUserIds) {
    console.log('THERE ARE NOT PENDING USERS TO BE CREATED, FINISHING CRONJOB');
    return;
  }

  // Prepare pending users ids converting them into an array.
  const pendingUserIdsArray = pendingUserIds.pending_ids.split(', ');

  console.log('CREATING USER WITH IDS: ', pendingUserIdsArray);
  const usersInDb = await userDAO.findAll({
    order: 'DESC',
    page: 1,
    size: 100,
    sort_by: 'id',
    userIds: pendingUserIdsArray,
  });

  const usersListIds = usersInDb.data.map(({ id }) => id);

  // Step 1: Create Users in DB optaning ReqResInfo
  const userFailedFromReqres = await createUsersUsingReqresAPIInfo(
    pendingUserIdsArray,
    usersListIds,
    createUser,
  );

  // Step 2: If there are users that couldn't be got from Reqres, we update pending_user table with the new ones.;
  if (userFailedFromReqres.length) {
    const newPendingIds = userFailedFromReqres.filter(
      (userId) => !pendingUserIdsArray.includes(Number(userId)) && userId <= 12,
    );
    if (newPendingIds[0]) {
      console.log(
        'SOME USERS FAILED TO BE CREATE, UPDATING PENDING USERS IDS: ',
        newPendingIds,
      );
      await pendingUserDAO.update({
        userId: 1,
        pending_ids: newPendingIds.join(', '),
      });
    }
    // Step 3: If all the pending users were created, we delete the pending users ids.
  } else {
    console.log('ALL THE USERS WERE CREATE, DELETING PENDING IDS');
    await pendingUserDAO.erase({ userId: 1 });
  }
};
