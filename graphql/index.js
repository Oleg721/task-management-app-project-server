const { graphqlHTTP} = require('express-graphql');
const {userController : {getUserByRequest}, taskController  : {getTaskByRequest}} = require(`../controllers`)
const schema = require(`./schema`);
const rootValue = require(`./rootValue`);




module.exports = graphqlHTTP(async (req, res) => ({
    schema,
    rootValue,
    graphiql: true,
    context: {user: await getUserByRequest(req)}
}))
