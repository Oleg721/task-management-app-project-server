
module.exports = (sequelize, Model, DataTypes) => {

    class User extends Model{}

    User.init({

            nickName : {
                type : DataTypes.STRING,
                allowNull : false,
                unique : true
            },
            name : {
                type : DataTypes.STRING,
            }

        },
        {sequelize,
            modelName : `User`})

    return User
}