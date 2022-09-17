const express = require('express');
const router = express.Router();
const {userController} = require('../controllers/index');

router.get('/',userController.rootPage)
router.post('/signup',userController.signup)
router.get('/verify/:code',userController.verify)
router.post('/login',userController.logIn)
router.post('/show-all-logins',userController.allLogins)
router.post('/update-user/:id',userController.makeUser)
router.post('/show-all-users',userController.allUsers)
router.get('/get-user-by-id/:id',userController.getUserById)
router.get('/remove-user/:id',userController.removeUser)







module.exports = {
    router,
}