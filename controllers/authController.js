const {hashSync, compareSync} = require(`bcrypt`);
const {sign, verify} = require(`jsonwebtoken`);
const {isPasswordValid, isUserValid} = require(`../validation`);
const {secret} = require(`../config/config`);
const {getUserByNickName, addUser} = require(`./userController`);


module.exports = {

    registration : async ({User : {name, nickName, password}}) => {

        if( !isPasswordValid(password) || !nickName) return null;

        try {
            if( await getUserByNickName(nickName)) return null;

            const passwordHash = await hashSync(password,7);
            const {id} = await addUser({name : name,
                            nickName: nickName,
                            passwordHash : passwordHash})

            if(!id) return null;

            return await sign({id: id, nickName: nickName}, secret)
        }catch (e) { console.log(e.name)}

    },



    login : async ({nickName, password}) => {
        if( !isPasswordValid(password) || !nickName) return null;

        try {
            const {id, passwordHash} = await getUserByNickName(nickName);
            if(!await compareSync(password,passwordHash)) return null;

            return sign({id: id, nickName: nickName}, secret,{expiresIn: "24h"});

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


