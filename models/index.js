const {sequelize} = require(`../connect`);
const { Model, DataTypes } = require("sequelize");

const user = require(`./User`);
const task = require(`./Task`);

module.exports.User = user(sequelize, Model, DataTypes);
module.exports.Task = task(sequelize, Model, DataTypes);
//module.exports.Task = require(`./Task`);
//
// module.exports.User = require(`./User`);
// module.exports.Task = require(`./Task`);