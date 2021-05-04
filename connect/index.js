const sequelize = require(`./sequelizeConnect`)



module.exports.connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await sequelize.sync();


}


module.exports.sequelize = sequelize;



/*(async ()=>{
   // let us = await addUser({name:`t2`, nickName : `n2`});

    console.log(`==========================`)
    console.log(await User.findAll())


})()*/


/*
await connect.sync();
await User.create({nickName : `Pit`, name : `Pieter`});
await Task.create({
    taskName: `test sk n7`,
    description : `bla bla bla... `,
    state : `active`
})
*/
