const { graphqlHTTP} = require('express-graphql');
const schema = require(`./schema`);
const rootValue = require(`./rootValue`)



module.exports = graphqlHTTP(async (req, res) => ({
    schema,
    rootValue,
    graphiql: true
}))