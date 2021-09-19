const app = require('./src/app');
const sequelize = require('./src/config/database');

sequelize.sync({ force: true });

const PORT = 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}.`));
