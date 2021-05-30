const {sequelize} = require(`../connectors`);
const { Model, DataTypes } = require("sequelize");

const User = require(`./User`)(sequelize, Model, DataTypes);
const Task = require(`./Task`)(sequelize, Model, DataTypes);



const User_Task = sequelize.define('User_Task', {role : {
        type : DataTypes.STRING,
    }}, { timestamps: false });

User.belongsToMany(Task, {through: User_Task});
Task.belongsToMany(User, {through: User_Task});


Task.hasMany(Task, {onDelete: 'CASCADE',
                            as: "children",
                            foreignKey: `parent`});



(async ()=>{
    // let p = await Task.findOne({
    //     where: {q
    //         id : 2
    //     }});
    // let c = await Task.findOne({
    //     where: {
    //         id : 3
    //     }});
    // console.log(p.dataValues);
    // console.log(c.dataValues);
    // let res = await p.addChild(c)
    // console.log(`===================`);
    // console.log(res);



})()

module.exports.User = User;
module.exports.Task = Task;



//console.log(User.prototype)


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

  _isAttribute: [Function (anonymous)],
  getUsers: [Function (anonymous)],
  countUsers: [Function (anonymous)],
  hasUser: [Function (anonymous)],
  hasUsers: [Function (anonymous)],
  setUsers: [Function (anonymous)],
  addUser: [Function (anonymous)],
  addUsers: [Function (anonymous)],
  removeUser: [Function (anonymous)],
  removeUsers: [Function (anonymous)],
  createUser: [Function (anonymous)],

  getChildren: [Function (anonymous)],
  countChildren: [Function (anonymous)],
  hasChild: [Function (anonymous)],
  hasChildren: [Function (anonymous)],
  setChildren: [Function (anonymous)],
  addChild: [Function (anonymous)],
  addChildren: [Function (anonymous)],
  removeChild: [Function (anonymous)],
  removeChildren: [Function (anonymous)],
  createChild: [Function (anonymous)]

*/


//module.exports.Task = require(`./Task`);
//
// module.exports.User = require(`./User`);
// module.exports.Task = require(`./Task`);