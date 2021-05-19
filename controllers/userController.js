const {User} = require(`../models`);


module.exports = {

    getUserById : async ({id})=> {
        return await User.findOne({
            where: {
                id : id
            }});
    },

    getUserByNickName : async (nickName)=> {
        console.log(nickName)
        return await User.findOne({
            where: {
                nickName : nickName
            }});
    },


    getUsers : async ()=> {
        console.log(`TEST!!!!!!!!!!!!!!!!!!!!!!`)
        return await User.findAll();
    },


    addUser : async ({name, nickName, passwordHash}) => {

        return await User.create({
            name : name,
            nickName: nickName,
            passwordHash : passwordHash
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
