const { DataTypes} = require('sequelize');
const sequelize = require('../config/database');


const Users = sequelize.define('people', {
    id : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true,
    },
    username : {
        type : DataTypes.STRING,
        allowNull: false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status : {
        type: DataTypes.STRING,
    },
    age : {
        type : DataTypes.INTEGER,

    },
    nickName : {
        type : DataTypes.STRING,

    },
    city : {
        type : DataTypes.STRING,

    },
    country : {
        type : DataTypes.STRING,

    },
    message :  {
       type : DataTypes.TEXT,

    },
    isAdmin : {
        type : DataTypes.BOOLEAN,
        defaultValue : true,
    },


}, {
    timestamps : false,
})




module.exports = {
    Users,
}