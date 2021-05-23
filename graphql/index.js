const { graphqlHTTP} = require('express-graphql');
const {userController : {getUserByRequest}} = require(`../controllers`)
const schema = require(`./schema`);
const rootValue = require(`./rootValue`);

console.log(getUserByRequest)


module.exports = graphqlHTTP(async (req, res) => ({
    schema,
    rootValue,
    graphiql: true,
    context: {user: await getUserByRequest(req)}
}))
