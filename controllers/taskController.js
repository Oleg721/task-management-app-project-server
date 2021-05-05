const {Task} = require(`../models`);

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
    }

}

