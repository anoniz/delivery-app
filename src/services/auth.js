const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require(".././utils/index");
require("dotenv").config();
const key = process.env.SECRET;
const from_email = process.env.FROM_EMAIL;

const token = function (payload) {
  return jwt.sign(payload, key, { expiresIn: "1h" });
};

const verifyToken = function (userToken) {

  try{
     const payload = jwt.verify(userToken, key,(err,decode) => {
      if(err) {
        console.log(err.name," : ",err.message);
      } 
      else console.log(decode);
     });
    
    if(!payload) return {err: {message: "unauthorized or invalid token", code: 403}};
    return {payload}
    }catch(err){
    // console.log(error);
    return {err: {message: "Something went wrongg, try again", code: 500}};
}
  
};

const adminToken = (token) => {
  const result = verifyToken(token);
  const isAdmin = result.isAdmin;
  return isAdmin;
};

const hashPassword = async (pass) => {
  return await bcrypt.hash(pass, 8);
};

const verifyPassword = async (currentPassword, hash) => {
  return await bcrypt.compare(currentPassword, hash);
};

const sendEmail = async (email,name) => {
  let confirmationCode = email;
  const message = {
    from: from_email,
    to: email,
    subject: " I Am NodeMailer",
    text: "Click Below Link to Confirm!!",
    html: `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <h3>Thank you for subscribing. Please confirm your email by clicking on the following link</h3>
    <a href=http://localhost:3000/verify/${confirmationCode}> <h2>CONFIRM EMAIL </h2></a>
    </div>`
  };
return await new Promise((resolve, reject) => {
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
      reject(err);
    } else {
      console.log(info.response);
      resolve(email);
    }
  })
}).then((value) => {
  return value;
});

};


module.exports = {
  token,
  verifyToken,
  adminToken,
  hashPassword,
  verifyPassword,
  sendEmail,
};


