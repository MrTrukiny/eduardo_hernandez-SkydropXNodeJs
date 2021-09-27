const app = require('./src/app');
const sequelize = require('./src/config/database');
const cronJobs = require('./src/crons');

// Initialize DB.
sequelize.sync();

// Initialize Cronjobs.
cronJobs.createPendingUsers.start();

const PORT = 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`));
