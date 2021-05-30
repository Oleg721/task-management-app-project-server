const {User} = require(`../models`);
const {verify} = require(`jsonwebtoken`);
const {secret} = require(`../config/config`)



module.exports = {

    getUserByRequest : async (req)=>{

       // console.log(req?.headers);
    const authorization = req?.headers?.authorization
    if (!authorization) return null
    if (!authorization.startsWith('Bearer ')) return null

    const token         = authorization.slice('Bearer '.length)
    try {
        const decoded = verify(token, secret);
        console.log("THISSS+++++");
        const userId  = decoded.id;
        return User.findByPk(userId);
    }
    catch(e){
        console.log(e);
        return null
    }
},

    getUserById : async ({id})=> {
        return await User.findOne({
            where: {
                id : id
            }});
    },

    getUserByLogin : async (login)=> {
        console.log(login)
        return await User.findOne({
            where: {
                login : login
            }});
    },


    getUsers : async ()=> {
        return await User.findAll();
    },


    addUser : async ({name, login, passwordHash}) => {

        return await User.create({
            name : name,
            login: login,
            passwordHash : passwordHash
        })
    }

}



/*
async function getUsers() {
    return await User.findAll();
}

module.exports.getUsers = getUsers;


async function addUser({name,login}) {
    return await User.create({
        name : name,
        login: login
    })
}

module.exports.addUser = addUser;
*/
