const express = require('express');
const app = express();
const port = 4000;
const {userController, taskController} = require(`./controllers`);
const bodyParser = require(`body-parser`);
const graphqlHTTP = require(`./graphql`);
require(`./connectors`).sync();



app.use(bodyParser.json());
app.use(express.static(`public`));

app.use('/graphql', graphqlHTTP)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

