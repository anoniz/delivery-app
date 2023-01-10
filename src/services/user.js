const {Users} = require('../models/userModel');


const signup = async function (user) {
    try {
        return await Users.create(user);
    } catch (err) {
        return {err: {message: "Something went wrong, try again", code: 500}};
    }
    
}


const getByEmail = async function(email) {
    try {
        return await Users.findOne( {where : {email : email}})
    } catch (err) {
        return {err: {message: "Something went wrong, try again", code: 500}};
    }
}


const showAllLogins = async function () {
    try {
        return await Users.findAll({attributes : ['email','password','isAdmin']})
    }  catch (err) {
        return {err: {message: "Something went wrong, try again", code: 500}};
    }

}

const updateUser = async function (id,user) {
      
    try {
       return await Users.update(user, {where: { id:id}})
    }  catch (err) {
        return {err: {message: "Something went wrong, try again", code: 500}};
    }
}

const showAllUsers = async function () {
    try {
        return await Users.findAll({attributes : {exclude : [ 'password']}});
    }  catch (err) {
        return {err: {message: "Something went wrong, try again", code: 500}};
    }
       
}


const getUserById = async function (id) {
    try {        
        return await Users.findOne( {where : {id : id}});
    }  catch (err) {
        return {err: {message: "Something went wrong, try again", code: 500}};
    }
}

const removeUser = async function (id) {
    try {
        return await Users.destroy({where : {id : id}})
    }   catch (err) {
        return {err: {message: "Something went wrong, try again", code: 500}};
    }
}




module.exports = {
    signup,
    showAllLogins,
    updateUser,
    showAllUsers,
    getUserById,
    removeUser,
    getByEmail,

}