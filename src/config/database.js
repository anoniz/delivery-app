const Sequelize = require('sequelize');
require('dotenv').config()
const db = process.env.DB;
const user = process.env.USERR;
const pass = process.env.PASS;

const sequelize = new Sequelize(db,user,pass, {
    dialect: 'postgres',
    query : { raw : true}
})

sequelize.authenticate()

module.exports = sequelize;