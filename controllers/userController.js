const {User: UserController} = require(`../models`);


async function getAllUser() {
    return await UserController.findAll();
}

module.exports.getAllUser = getAllUser;


async function addUser({name,nickName}) {
    return await UserController.create({
        name : name,
        nickName: nickName
    })
}

module.exports.addUser = addUser;
