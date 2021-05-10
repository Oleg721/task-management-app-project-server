const {sequelize} = require(`../connectors`);
const { Model, DataTypes } = require("sequelize");

const User = require(`./User`)(sequelize, Model, DataTypes);
const Task = require(`./Task`)(sequelize, Model, DataTypes);

User.belongsToMany(Task, {through: "usersTask"});
Task.belongsToMany(User, {through: "usersTask"});

Task.hasMany(Task,{as: "Children", foreignKey: `childrenn` });
Task.belongsTo(Task, {foreignKey: `parent`})

module.exports.User = User;
module.exports.Task = Task;

console.log(Task.prototype)


/*
USER
  getTasks: [Function (anonymous)],
  countTasks: [Function (anonymous)],
  hasTask: [Function (anonymous)],
  hasTasks: [Function (anonymous)],
  setTasks: [Function (anonymous)],
  addTask: [Function (anonymous)],
  addTasks: [Function (anonymous)],
  removeTask: [Function (anonymous)],
  removeTasks: [Function (anonymous)],
  createTask: [Function (anonymous)]

TASK
    getUsers: [Function (anonymous)],
    countUsers: [Function (anonymous)],
    hasUser: [Function (anonymous)],
    hasUsers: [Function (anonymous)],
    setUsers: [Function (anonymous)],
    addUser: [Function (anonymous)],
    addUsers: [Function (anonymous)],
    removeUser: [Function (anonymous)],
    removeUsers: [Function (anonymous)],
    createUser: [Function (anonymous)]

*/


//module.exports.Task = require(`./Task`);
//
// module.exports.User = require(`./User`);
// module.exports.Task = require(`./Task`);