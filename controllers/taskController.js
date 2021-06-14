const {Task, User} = require(`../models`);
const {getUserById} = require(`./userController`)
const { Op } = require("sequelize");

module.exports = {

    getTaskById: async ({id})=>{

        // let usersId = [1,2]
        // let users = await User.findAll({where :
        //         {id: {
        //                 [Op.or] : [...usersId]}}});
        //
        // let createdTask = await Task.findByPk(75)
        //
        // await createdTask.addUsers(users, {through: {role : `EXECUTOR`}});
        //


        let task = await Task.findByPk(id);
        return task

    },

    getUserTasks : async ({},{user})=>{

        if (!user) return null
        return await user.getTasks();
    },

    getUserProjects : async ({},{user})=>{

        if (!user) return null
        return await user.getTasks({where :
                                        {path :
                                            {[Op.notLike] : '/%/%' }}});
    },


    createTask: async ({Task : {name, description, startDate, endDate}, usersId, parentTaskId}, {user})=>{


        if(!user)return null;
        let parentPath = ``;
        let role = ``
        if(usersId.length){
            const creatorUserIndex = usersId.indexOf(user.id.toString());
            role =   creatorUserIndex === -1 ? `OWNER` : (usersId.splice(creatorUserIndex, 1) , `OWNER_AND_EXECUTOR`);
        } else {
            role = `OWNER_AND_EXECUTOR`;
        }

        console.log(usersId);
        console.log(role);
        const createdTask = await  user.createTask({
            name : name,
            description : description,
            startDate : startDate,
            endDate: endDate
        }, {through: {role : role}});

        if(usersId.length) {
            const users = await User.findAll({where :
                                        {id: {
                                            [Op.or] : [...usersId]}}});
            console.log(users);
            await createdTask.addUsers(users, {through: {role : `EXECUTOR`}});
        }

        if(parentTaskId){
            const parentTask = await Task.findByPk(parentTaskId);
            await parentTask.addTaskChild(createdTask);
            parentPath = parentTask.path
        }

        await Task.update({path : `${parentPath}/${createdTask.id}` },
                         {where: {id : createdTask.id}});

        return await Task.findByPk(createdTask.id);

    },


    getTaskChildren : async ({Task : {id}})=> {
        let task = await Task.findByPk(id);

        return await task.getTaskChildren();
    },


    updateTask : async ({Task : task})=>{
        console.log(task.state)
     try {
         const originalTask = await Task.findByPk(task.id);
         const isUpdated = !!await Task.update({...originalTask, ...task }, {where : {id: task.id}});
         if(isUpdated) return await Task.findByPk(task.id);
         return null;
     }catch (e) {
         console.log(e)
         return null
     }


    }


}
