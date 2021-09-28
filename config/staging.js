module.exports = {
  database: {
    database: process.env.POSTGRES_DB_NAME_STAG,
    username: process.env.POSTGRES_USERNAME_STAG,
    password: process.env.POSTGRES_PASSWORD_STAG,
    host: process.env.SEQUELIZE_DB_HOST_STAG,
    dialect: process.env.SEQUELIZE_DB_DIALECT_STAG,
    logging: process.env.SEQUELIZE_DB_LOGGING_STAG === 'false' ? false : true,
  },
};
