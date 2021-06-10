
module.exports = (sequelize, Model, DataTypes) => {

    class Task extends Model{

         get children(){
            return this.getTaskChildren();
        }

        get users(){
             return this.getUsers();
        }

        get task(){
            return this
        }

        get countChildren(){
             return this.countTaskChildren();
        }

    }

    Task.init({

        id:{
            type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
            name : {
                type : DataTypes.STRING,
                allowNull : false,
            },
            state : {
                type : DataTypes.ENUM(`ACTIVE`, `IN_WORK`, `COMPLETED`),
                defaultValue : `ACTIVE`
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
            },
            path : {
                type: DataTypes.STRING,
                defaultValue: ``,
                primaryKey: true
            }
        },
        {sequelize,
            modelName : `Task`})
    return Task
}