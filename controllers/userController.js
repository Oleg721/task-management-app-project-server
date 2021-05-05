const {User} = require(`../models`);


module.exports = {

    getUserById : async ({id})=> {
        console.log(id)
        return await User.findOne({
            where: {
                id : id
            }});
    },


    getUsers : async ()=> {
        return await User.findAll();
    },


    addUser : async ({User : {name,nickName}}) => {
        return await User.create({
            name : name,
            nickName: nickName
        })
    }

}


/*
async function getUsers() {
    return await User.findAll();
}

module.exports.getUsers = getUsers;


async function addUser({name,nickName}) {
    return await User.create({
        name : name,
        nickName: nickName
    })
}

module.exports.addUser = addUser;
*/
