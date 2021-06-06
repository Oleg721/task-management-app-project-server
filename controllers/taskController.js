const {Task, User} = require(`../models`);
const {getUserById} = require(`./userController`)
const { Op } = require("sequelize");

module.exports = {


    getUserProjects : async ({},{user})=>{
        console.log(user);
        if (!user) return null
        return await user.getTasks({where :
                                        {path :
                                            {[Op.notLike] : '/%/%' }}});
    },


    createTask: async ({Task : {name, description, startDate, endDate}, userId, parentTaskId}, {user})=>{

        if(!user)return null;
        const taskUser = await User.findByPk(userId)
        let parentPath = ``;
        const role = (user.id === taskUser.id) ? `OWNER` : `EXECUTOR`

        const createdTask = await  taskUser.createTask({
            name : name,
            description : description,
            startDate : startDate,
            endDate: endDate
        }, {through: {role : role}});

        if(parentTaskId){
            const parentTask = await Task.findByPk(parentTaskId);
            parentTask.addChild(createdTask);
            parentPath = parentTask.path
        }

        await Task.update({path : `${parentPath}/${createdTask.id}` },
                         {where: {id : createdTask.id}});

        return await Task.findByPk(createdTask.id);
    },


    getTaskChildren : async ({Task : {id}})=> {
        let task = await Task.findByPk(id);
        return await task.getChildren();
    },

/*
    getAllTaskChildren : async ({id : loginparentTaskId})=> {

        console.log( loginparentTaskId);
        let tmp = await Task.findAll({where:
                {path : {[Op.regexp] : `/${loginparentTaskId}/.+`}}});
        console.log(tmp.length);

        return JSON.stringify(tmp.map(({id,name, state, path}) => {
            console.log(`========`)
            console.log(id,name, state, path)



                let a  =`\/`+loginparentTaskId+`\/.+`
                //console.log(a)
               // console.log(path.match(new RegExp(a))[0].split(`/`).length-2)
                let deeps = path.match(new RegExp(a))[0].split(`/`).length-2;


            return {id, name, state, deeps : deeps}}))
    }
*/



}
/*

createTask: async ({Task : {name, description, startDate, endDate}, userId, loginparentTaskId})=>{

    console.log(loginparentTaskId)

    let user = await getUserById({id : userId});
    let taskID;

    if(loginparentTaskId){
        const parentTask = await Task.findByPk(loginparentTaskId);
        const {id} = await parentTask.createChild({
            name : name,
            description : description,
            startDate : startDate,
            endDate: endDate
        });
        await Task.update({path : `${parentTask.getDataValue(`path`)}/${id}` },
            {where: {id : id}})
        taskID = id;

    } else {
        const {id} = await user.createTask({
            name : name,
            description : description,
            startDate : startDate,
            endDate: endDate
        });
        await Task.update({path : `/${id}` }, {where: {id : id}});
        taskID = id;
    }

    return await Task.findByPk(taskID);
},*/
