const {sequelize} = require(`../connectors`);
const { Model, DataTypes } = require("sequelize");

const User = require(`./User`)(sequelize, Model, DataTypes);
const Task = require(`./Task`)(sequelize, Model, DataTypes);



module.exports.User = User;
module.exports.Task = Task;



//module.exports.Task = require(`./Task`);
//
// module.exports.User = require(`./User`);
// module.exports.Task = require(`./Task`);