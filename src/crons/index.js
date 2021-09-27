const cron = require('node-cron');
const createPendingUsersCronjob = require('./create_pending_users.cron');

const createPendingUsers = cron.schedule(
  '10 * * * * *',
  async () => {
    await createPendingUsersCronjob();
  },
  {
    scheduled: false,
  },
);

module.exports = { createPendingUsers };
