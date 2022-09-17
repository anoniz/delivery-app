const { v4: uuidv4 } = require('uuid');
const rootPage = (req,res) => res.send('its working')
const {userService,authService} = require('../services/index');

const verify = async (req,res) => {
    console.log(typeof(req.params.code))
    const confirmationCode = req.params.code;
    const user = await userService.getByEmail(confirmationCode)
    const {id,email,isAdmin} = user;

    if(email == confirmationCode) {
        user.status = "active"
      const updateStatus =  await userService.updateUser(id,user)
      console.log(updateStatus)
      
      const payload = {id,email,isAdmin}
      const token = authService.token(payload)
      return res.status(200).send({"auth": token})
    }
      else {
        return res.status(403).send({message : "Verification faild"})
      }
}




const signup = async(req, res) => {
    const {username,email,password,isAdmin,} = req.body;
    const checkEmail = await userService.getByEmail(email); 
    if(checkEmail != null) return res.send("email already exits")
    
    const hash = await authService.hashPassword(password);

    const id = uuidv4()
    const user = {
        id,username,password:hash,
        email,
        status : "pending",
        age:null,
        nickname:null, 
        city: null,
        country:null,
        message:null,
        isAdmin,
    }
      userService.signup(user)
      const sendMail = authService.sendEmail(email,username)
      if(sendMail.err) return res.send(sendMail.err);
      else return res.status(200).send({message : "Verification link has been sent"})
     
}

const logIn = async (req,res) => {
    const {email, pass} = req.body;
    
    try{
        const user = await userService.getByEmail(email);
        if(user == null) return res.status(401).send({message: 'Incorrect email!', code: 401});
        const valid = await authService.verifyPassword(pass,user.password);

        if(!valid) return res.status(401).send({message: 'Incorrect password', code: 401});
        const payload = {
            id:user.id,
            email:user.email,
            isAdmin:user.isAdmin
        }
        const token = authService.token(payload);

        return res.status(200).send({accessToken: token});
    } catch(error) {
        return res.status(500).send({message: 'Internal Server Error', code: 500});
    }
};


const allLogins = async(req, res) => {
    try {
        const token = req.headers.token
        const isAdmin = authService.adminToken(token)
        if(isAdmin) return res.status(200).send(await userService.showAllLogins())
        else return res.status(403).send({message: 'unathorized token'})
    } catch (err) {
        return res.status(403).send({message: 'invalid or expired token'})
    }
  
}

const allUsers = async(req, res) => {
    try {
        const token = req.headers.token
        const isAdmin = authService.adminToken(token);
        const users = await userService.showAllUsers();
        // console.log(users);
        if(isAdmin) return res.status(200).send(users)
        else return res.status(403).send({message: 'unathorized token'})
    } catch (err) {
        console.log(err);
         return res.status(403).send({message: "invalid or expired token"})
    }
    
}

const makeUser = (req, res) => {
    try {
    const userToken = req.headers.token
    const id = req.params.id;
    const result = authService.verifyToken(userToken)
    const tokenId = result.id
    if(id != tokenId) return res.status(403).send({message:'invalid token or ID'})

    const {username,age,nickName,country,city,message} = req.body
    const user = {
       username,age,nickName,country,city,message
    }
      userService.updateUser(id,user)
      return res.status(200).send(user);

}  catch (err)  {
        return res.status(403).send({message: 'unathroized token'});
}}



const getUserById = async(req, res) => {
    try {
    const id = req.params.id
    const token = req.headers.token
    const payload = authService.verifyToken(token)
    const tokenId = payload.id

    const user = await userService.getUserById(id)
    if(id != tokenId) return res.status(403).send({message:'invalid token or ID'})
    else if(!user) return res.status(404).send({message:'user not found'})
    else return res.status(200).send(user)

    } catch(err) {
        console.log(err);
        return res.status(404).send({message: "token expired , login again"})
    }
    
}

const removeUser = async(req, res) => {
    try {
        const id = req.params.id
        const token = req.headers.token
        const payload = authService.verifyToken(token)
        const tokenId = payload.id
        const isAdmin = authService.adminToken(token)
        if(!isAdmin) 
        if(id != tokenId) return res.status(403).send({message:'Invalid id or token'})
        const user = await userService.removeUser(id);
        if(!user) return res.status(404).send({message: "user not found"})
        return res.status(200).send({message : "user removed"})

    } catch (err) {
        console.log(err);
        return res.status(404).send({message: "token expired , login again"})
    }
   
}



module.exports = {
    signup,
    rootPage,
    allLogins,
    makeUser,
    allUsers,
    getUserById,
    logIn,
    removeUser,
    verify

}