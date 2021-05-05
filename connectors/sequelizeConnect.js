const { Sequelize, Model, DataTypes } = require("sequelize");
const {development : config} = require('../config/config')


const sequelizeConnect = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: config.dialect,
    logger: console.log
});


module.exports = sequelizeConnect