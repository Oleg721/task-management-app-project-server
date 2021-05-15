

module.exports = (sequelize, Model, DataTypes) => {

    class User extends Model{
        get tasks(){
            return this.getTasks();
        }


    }

    User.init({

            nickName : {
                type : DataTypes.STRING,
                allowNull : false,
                unique : true
            },
        passwordHash: {
                type : DataTypes.STRING,
                allowNull : false,
        },
            name : {
                type : DataTypes.STRING,
            }

        },
        {sequelize,
            modelName : `User`})

    return User
}