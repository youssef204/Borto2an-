const express = require("express"); 
const User = require("./../../models/User");
const jwt = require('jsonwebtoken');
const user_Router = express.Router();
const session = require('express-session') ;
const dotenv = require("dotenv");
const app = express();
const authenticate = require("./Authentication");
const bcrypt = require('bcrypt');
app.use(express.json());
dotenv.config(); 
const isValidEmail = (v) => {
  //checks if email has @ and . after @
  if (!v.includes("@")) return false;
  let arr = v.split("@");
  if (!arr[1].includes(".")) return false;
  return true;
};


function isValidEntry(entry) {
  //check for all required data
  if (
    !entry.firstName ||
    !entry.lastName ||
    !entry.email ||
    !entry.password ||
    !entry.passportNumber ||
    !entry.countryCode ||
    !entry.homeAddress ||
    !entry.userName ||
    !entry.telephoneNumber
  )
    return false;
  return true;
}
function isValidUpdate(entry) {
  //check for all required data
  if(!entry)
    return false;
  if (
    ("firstName" in entry && !entry.firstName) ||
    ("lastName" in entry && !entry.lastName) ||
    ("email" in entry && !entry.email) ||
    ("password" in entry && !entry.password) ||
    ("passportNumber" in entry && !entry.passportNumber) ||
    ("email" in entry && !isValidEmail(entry.email)) ||
    ("countryCode" in entry && !entry.countryCode) ||
    ("homeAddress" in entry && !entry.homeAddress) ||
    ("userName" in entry && !entry.userName) || 
    ("telephoneNumber" in entry && !entry.telephoneNumber)
    

  )
    return false;
  return true;
}

user_Router.get("/:id",authenticate, (req, res) => {
  if(!req.user.isAdmin){
    res.sendStatus(401);
  }
  User.findById(req.params.id)
    .then((e) => res.send(e))
    .catch((err) => {
      res.status(500).send("not a correct id");
      console.log(err);
    });
});

user_Router.get("/",authenticate, async(req, res) => {
  const users = await User.find();
//  console.log(users);
  console.log(req.user);
  res.json(users.filter(user=>(user.email==req.user.email)));
});

//create
user_Router.post("/register", async(req, res) => {
  console.log(req.body);
  if (isValidEntry(req.body)) {
    if(isValidEmail(req.body.email)) {
  let entry = req.body;
  const hashedPassword = bcrypt.hashSync(req.body.password,10);
  entry.password = hashedPassword;
  console.log(entry);
    const user = User(entry);
    user
      .save()
      .then(() => {
        res.send("New user registered Successfully");
      })
      .catch((err) => {
        if (err) {
              console.error(err);
          res.status(500).send("Database error " + err);
        }
      });
    }
    else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(402);
  }
});

//update
user_Router.put("/", authenticate , async (req, res) => {
  const id = req.body._id;
  const update = req.body.update;
  console.log(update);
  if (!id || !isValidUpdate(update)) {res.sendStatus(422); console.log(id);}
  const updated = await User.findByIdAndUpdate(id, update, {new: true}).catch((err) => res.status(400).send(err));
  res.send(updated);
});

user_Router.put("/password", authenticate , async (req, res) => {
  const id = req.body._id;
  const update = req.body.update;
  let oldpassUser;
  if (!id) {res.sendStatus(422);}
   oldpassUser = await User.findById(id);
   const new_hashedPassword = bcrypt.hashSync(update.password,10);
  console.log("user data " , oldpassUser);
  const compare = await bcrypt.compare(update.oldPassword,oldpassUser.password);
  if(!compare)
  res.sendStatus(401);
  else{
  console.log("updated value is", update);
  const updated = await User.findByIdAndUpdate(id, {password:new_hashedPassword}, {new: true}).catch((err) => res.status(400).send(err));
  res.send(updated);
  }
  let oldpassUser = '';
  console.log(update);
  if (!id) {res.sendStatus(422); console.log(id);}
  try{
   oldpassUser = await User.findById(id);
  console.log("user data " , oldpassUser);
  }
  catch{
    console.log("mafessh user kdaaa");
  }
  if(oldpassUser.password !== update.oldPassword)
  res.sendStatus(401);
  delete update.oldPassword;
  console.log("updated value is", update);
  const updated = await User.findByIdAndUpdate(id, update, {new: true}).catch((err) => res.status(400).send(err));
  res.send(updated);
});


user_Router.delete("/:id",authenticate, async (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
      const Reservation = require("../../models/Reservation");
      await Reservation.deleteMany({userId:user._id});
      res.send(user);
    }
    else
      res.status(404).json({ msg: `No user with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});
module.exports = user_Router;
