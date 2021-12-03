const User = require("./../../models/User");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const auth_Router = express.Router();

app.use(express.json())

let refreshTokens = []

auth_Router.post('/refreshToken', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const new_user = {firstName:user.firstName, lastName: user.lastName , email:user.email,password:user.password,passportNumber:user.passportNumber,isAdmin:user.isAdmin}
    const accessToken = generateAccessToken(new_user);
    res.json({ accessToken: accessToken })
  })
})

auth_Router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

auth_Router.post("/login", async(req, res) => {
    console.log(req.body);
    const {email,password} = req.body;
    const user = await User.find({email:email});
    if(user[0]){
      console.log(user);
      const compare = (user[0].password===password) ; 
      if(compare){
        const {_id,email,password,isAdmin}=user[0];
        const new_user = {userId:_id,email,password,isAdmin};  
        const token = generateAccessToken(new_user);
        const refreshToken = jwt.sign(new_user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken);
        res.status(200).json({auth:true , token:token , refreshToken:refreshToken, user:{...user[0]._doc,password:''}});
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
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' })
}

module.exports = auth_Router ; 