const {Task, User} = require(`../models`);
const {getUserById} = require(`./userController`)
const { Op } = require("sequelize");

module.exports = {

    getTasks : async ()=>{
        return await Task.findAll();
    },

    getTaskById : async ({id})=>{
          return await Task.findByPk(id);
    },

    addTask : async ({name, state = `active`, description, startDate, endDate}, path)=>{
        return await Task.create({
            name : name,
            state : state,
            description : description,
            startDate : startDate,
            endDate: endDate
        })
    },


    createTask: async ({Task : {name, description, startDate, endDate}, userId, parentId})=>{

        console.log(parentId)

        let user = await getUserById({id : userId});
        let taskID;

        if(parentId){
            const parentTask = await Task.findByPk(parentId);
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
    },


    getTaskChildren : async ({Task : {id}})=> {
        return await Task.findAll({where:
                {path : {[Op.regexp] : `/${id}/[0-9]+$`}}});
    },

    getAllTaskChildren : async ({id : parentId})=> {

        console.log( parentId);
        let tmp = await Task.findAll({where:
                {path : {[Op.regexp] : `/${parentId}/.+`}}});
        console.log(tmp.length);

        return JSON.stringify(tmp.map(({id,name, state, path}) => {
            console.log(`========`)
            console.log(id,name, state, path)



                let a  =`\/`+parentId+`\/.+`
                //console.log(a)
               // console.log(path.match(new RegExp(a))[0].split(`/`).length-2)
                let deeps = path.match(new RegExp(a))[0].split(`/`).length-2;


            return {id, name, state, deeps : deeps}}))
    }



}

