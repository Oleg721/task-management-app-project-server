const {Task, User} = require(`../models`);
const {getUserById} = require(`./userController`)

module.exports = {

    getTasks : async ()=>{
        return Task.findAll();
    },

    addTask : async ({name, state = `active`, description, startDate, endDate})=>{
        return await Task.create({
            name : name,
            state : state,
            description : description,
            startDate : startDate,
            endDate: endDate
        })
    },

    CreateTask: async ({Task : {name, description, startDate, endDate}})=>{
console.log(`=========`);
        let user = await getUserById({id:2});

        console.log(name);
        const tmp = await user.createTask({   name : name,
                            description : description,
                            startDate : startDate,
                            endDate: endDate});
        console.log(tmp);
        return tmp
    }

}

