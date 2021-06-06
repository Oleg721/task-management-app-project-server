const {User} = require(`../models`);
const {verify} = require(`jsonwebtoken`);
const {secret} = require(`../config/config`)



 async function getUserByRequest(req){


    const authorization = req?.headers?.authorization;
    if (!authorization) return null
    if (!authorization.startsWith('Bearer ')) return null

    const token         = authorization.slice('Bearer '.length)
    try {
        const decoded = verify(token, secret);
        const userId  = decoded.id;
        return User.findByPk(userId);
    }
    catch(e){
        console.log(e);
        return null
    }
}

  async function getUserById({id}){
        return await User.findOne({
            where: {
                id : id
            }});
    }

  async function getUserByLogin(login){
        console.log(login)
        return await User.findOne({
            where: {
                login : login
            }});
    }


 async function  getUsers(){
        return await User.findAll();
    }


 async function addUser({name, login, passwordHash}){

        return await User.create({
            name : name,
            login: login,
            passwordHash : passwordHash
        })
    }

    module.exports  = {addUser, getUsers, getUserByLogin, getUserById, getUserByRequest }

/*


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
*/

