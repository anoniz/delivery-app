const express = require('express');
const {Users} = require('./models/userModel')
const sequelize = require('./config/database')
const app = express();
app.use(express.json());
const {userRoutes} = require('./routes/index');

app.use('/',userRoutes.router);



// sequelize.sync({alter : true}).then(() => {
//     console.log("success");
// }).catch(err => console.log(err + "  => somethig is wrong"));

sequelize.authenticate().then(() => {
    console.log("connected successssssssssssssssssssssssss")
})

app.listen(3000, () => console.log('listening on port 3000'));

