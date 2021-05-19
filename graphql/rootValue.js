const { userController,
        taskController,
        authController} = require(`../controllers`);

module.exports = {...userController, ...taskController, ...authController}

