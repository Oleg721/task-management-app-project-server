const { Sequelize, Model, DataTypes } = require("sequelize");
const config = require('../config/config')


const sequelizeConnect = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logger: console.log,

});


module.exports = sequelizeConnect