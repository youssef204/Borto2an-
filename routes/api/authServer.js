const User = require("./../../models/User");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const auth_Router = express.Router();
const bcrypt = require('bcrypt');

app.use(express.json())

let refreshTokens = []

function generatePassword(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

const sendEmail = async (user, subject, body)=>{
  const email = user.email;
  const nodeMailer = require('nodemailer');
  const dotenv = require('dotenv');
  dotenv.config();
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'borto2an5@gmail.com',
      pass: process.env.BORTO_PW
    }
  });
  const mailOptions = {
    from: 'borto2an5@gmail.com',
    to: email,
    subject: subject,
    text: body

  };
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
  });
}

/**
 * @swagger
 * /api/user/auth/refreshToken:
 *  post:
 *    description: An endpoint to generate an access token provided a valid refresh token in the request body.
 *    responses:
 *      '200':
 *        description: the provided token is valid, and an access token is sent to the user
 *      '401':
 *        description: no refresh token is provided in the request body
 *      '403':
 *        description: refresh token not found in the list of stored refresh tokens, or invalid refresh token
 *    tags:
 *      - Authentication Server
 */

auth_Router.post('/refreshToken', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken })
  })
})

/**
 * @swagger
 * /api/user/auth/logout:
 *  delete:
 *    description: An endpoint to delete a provided refresh token from the list of the stored refresh tokens
 *    responses:
 *      '204':
 *        description: the refresh token is removed successfully
 *    tags:
 *      - Authentication Server
 */

auth_Router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token);
  res.sendStatus(204);
});

/**
 * @swagger
 * /api/user/auth/reset:
 *  post:
 *    description: An endpoint to reset a user's password when they have forgotten it. A random alphanumeric string of length 10 is generated and is sent to the user email after being hashed and put in the database to replace the old user password.
 *    responses:
 *      '200':
 *        description: password is reset and email is sent successfully
 *      '401':
 *        description: user was not found in database
 *    tags:
 *      - Authentication Server
 */

auth_Router.post('/reset', async (req, res)=>{
  const {email} = req.body;
  const user = await User.find({email:email});
  console.log(user[0]);
  if(user[0]){
    const newPassword = generatePassword(10);
    const newHashedPassword = bcrypt.hashSync(newPassword,10);
    const updated = await User.findByIdAndUpdate(user[0]._id, {password:newHashedPassword}, {new: true}).catch((err) => res.status(400).send(err));
    sendEmail(user[0], "New account password", "Your new password is "+newPassword);
    res.send(updated);
  }else{
    res.sendStatus(401);
  }
});

/**
 * @swagger
 * /api/user/auth/login:
 *  post:
 *    description: An endpoint to allow a user to login. The user data is requested from the database and their password is hashed to be compared with the stored hasehd password.
 *    responses:
 *      '404':
 *        description: user not found in the database
 *      '400':
 *        description: wrong password
 *      '200':
 *        description: login successful. An access token, refresh token, user data, and a true bolean are sent to the requester to finalize the login process.
 *    tags:
 *      - Authentication Server
 */

auth_Router.post("/login", async(req, res) => {
    const {email,password} = req.body;
    const user = await User.find({email:email});
    console.log(user);
    if(user[0]){
      const compare = await bcrypt.compare(password,user[0].password); 
      if(compare){
        const {_id,email,password,isAdmin}=user[0];
        const new_user = {userId:_id,email,password,isAdmin};  
        const token = generateAccessToken(new_user);
        const refreshToken = jwt.sign(new_user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.status(200).json({auth:true , token:token , refreshToken:refreshToken, user:{...user[0]._doc}});
      }
      else{
        res.send({auth:false , message:"Wrong Password"});
      }
  
    }
    else{
      res.send({auth:false , message:"User not found"});
    }
  });
  

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = auth_Router ; 