const express = require('express');
const app = express();
const port = 3000;
const {userController, taskController} = require(`./controllers`);
const bodyParser = require(`body-parser`);



app.use(bodyParser.json())
app.use(express.static(`public`))

app.get('/', (req, res) => {

    res.sendfile(`index.html`)
   // res.send(`index.html`)
})


app.get('/users', async (req, res) => {

    let users  = await userController.getAllUser();
    users = users.map(value => value.dataValues);
    console.log(users);
    res.send(JSON.stringify(users));
})


app.post('/add-user', async (req, res) => {
    console.log(req.body)
    let userInfo = await userController.addUser(req.body)
    res.send(userInfo.dataValues)
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

