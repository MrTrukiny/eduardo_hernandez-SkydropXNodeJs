module.exports = {
  database: {
    database: process.env.POSTGRES_DB_NAME_PROD,
    username: process.env.POSTGRES_USERNAME_PROD,
    password: process.env.POSTGRES_PASSWORD_PROD,
    host: process.env.SEQUELIZE_DB_HOST_PROD,
    dialect: process.env.SEQUELIZE_DB_DIALECT_PROD,
    logging: process.env.SEQUELIZE_DB_LOGGING_PROD === 'false' ? false : true,
  },
};
