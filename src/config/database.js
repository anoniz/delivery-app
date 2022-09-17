const Sequelize = require('sequelize');
const sequelize = new Sequelize('testdb','myuser','abc123', {
    dialect: 'postgres',
    query : { raw : true}
})

sequelize.authenticate()

module.exports = sequelize