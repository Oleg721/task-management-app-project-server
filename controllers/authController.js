const {hashSync, compareSync} = require(`bcrypt`);
const {sign, verify} = require(`jsonwebtoken`);
const {isPasswordValid, isUserValid} = require(`../validation`);
const {secret} = require(`../config/config`);
const {getUserByLogin, addUser} = require(`./userController`);


module.exports = {

    registration : async ({User : {name, login, password}}) => {

        if( !isPasswordValid(password) || !login) return null;

        try {
            if( await getUserByLogin(login)) return null;

            const passwordHash = await hashSync(password,7);
            const {id} = await addUser({name : name,
                            login: login,
                            passwordHash : passwordHash})

            if(!id) return null;

            return await sign({id: id, login: login}, secret)
        }catch (e) { console.log(e.name)}

    },



    login : async ({login, password}) => {
        if( !isPasswordValid(password) || !login) return null;

        try {
            const {id, passwordHash} = await getUserByLogin(login);
            if(!await compareSync(password,passwordHash)) return null;

            return sign({id: id, login: login}, secret,{expiresIn: "24h"});

        }catch (e) { console.log(e.name)}
    },

    verifyToken : async ({authToken}) => {
        try {
            return  !!verify(authToken, secret)
        }catch (e) {
            console.log(`verifyToken >> ` + e.name)
        }
        return false
    }
}


