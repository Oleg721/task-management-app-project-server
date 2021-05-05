
module.exports = (sequelize, Model, DataTypes) => {

    class Task extends Model{}

    Task.init({

            name : {
                type : DataTypes.STRING,
                allowNull : false,
            },
            state : {
                type : DataTypes.ENUM(`active`, `inWork`)
            },
            description : {
                type : DataTypes.TEXT
            },
            startDate : {
                type : DataTypes.DATEONLY,
                defaultValue : ()=> new Date().toISOString()
            },
            endDate : {
                type : DataTypes.DATEONLY,
                defaultValue : ()=> new Date(Date.now() + (24*60*60*1000)).toISOString()

            }

        },
        {sequelize,
            modelName : `Task`})
    return Task
}