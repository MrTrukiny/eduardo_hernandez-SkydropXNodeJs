module.exports = {
  database: {
    database: process.env.SQLITE_DB_NAME_TEST,
    username: process.env.SQLITE_USERNAME_TEST,
    password: process.env.SQLITE_PASSWORD_TEST,
    dialect: process.env.SEQUELIZE_DB_DIALECT_TEST,
    storage: process.env.SEQUELIZE_DB_STORAGE_TEST,
    logging: process.env.SEQUELIZE_DB_LOGGING_TEST === 'false' ? false : true,
  },
};
