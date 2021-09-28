module.exports = {
  database: {
    database: process.env.SQLITE_DB_NAME_DEV,
    username: process.env.SQLITE_USERNAME_DEV,
    password: process.env.SQLITE_PASSWORD_DEV,
    dialect: process.env.SEQUELIZE_DB_DIALECT_DEV,
    storage: process.env.SEQUELIZE_DB_STORAGE_DEV,
    logging: process.env.SEQUELIZE_DB_LOGGING_DEV === 'false' ? false : true,
  },
};
