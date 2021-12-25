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

/**
 * @swagger
 * /api/user/:id:
 *  get:
 *    description: An endpoint to get a specific User from the database.
 *    parameters:
 *      - in: path
 *        description: id of the requested User
 *    responses:
 *      '200':
 *        description: the target User is retrieved from the database
 *      '401':
 *        description: the requester is not an admin
 *      '500':
 *        description: error in the request sent to the database
 *    tags:
 *      - User
 */

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

/**
 * @swagger
 * /api/user/:
 *  get:
 *    description: An endpoint to get a specific User from the database. The user is searched for by the email of the requester.
 *    responses:
 *      '200':
 *        description: the target User is retrieved from the database
 *      '403':
 *        description: unauthorized user
 * 
 *    tags:
 *      - User
 */

user_Router.get("/",authenticate, async(req, res) => {
  const users = await User.find();
//  console.log(users);
  console.log(req.user);
  res.json(users.filter(user=>(user.email==req.user.email)));
});

/**
 * @swagger
 * /api/user/:
 *  post:
 *    description: An endpoint to create a user in the database. The user JSON is added in the request body. The password is hashed before being stored in the database.
 *    responses:
 *      '200':
 *        description: the target user is added to the database
 *      '401':
 *        description: invalid email provided
 *      '402':
 *        description: invalid user provided
 *      '500':
 *        description: database error
 *    tags:
 *      - User
 */

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

/**
 * @swagger
 * /api/user/:
 *  put:
 *    description: An endpoint to update a user in the database. The request body should contain _id of target user, and an update JSON that specifies which attributes to update.
 *        
 *    responses:
 *      '401':
 *        description: invalid email in the update JSON
 *      '200':
 *        description: the target user is updated in the database
 *      '400':
 *        description: error in the request sent to the database
 *    tags:
 *      - User
 */

//update
user_Router.put("/", authenticate , async (req, res) => {
  const id = req.body._id;
  const update = req.body.update;
  console.log(update);
  if (!id || !isValidUpdate(update))
    {
      if(!isValidEmail(update.email))
      res.sendStatus(401); 
      else 
      res.sendStatus(422)
      console.log(id);
    }
  const updated = await User.findByIdAndUpdate(id, update, {new: true}).catch((err) => res.status(400).send(err));
  res.send(updated);
});

/**
 * @swagger
 * /api/user/password/:
 *  put:
 *    description: An endpoint to update a user password in the database. The request body should contain _id of target user, and an update JSON that specifies that the password must be updated. The old user password is compared with the hasehd password in the database. If the passwords match, the old password is updated to the new password hashed.
 *        
 *    responses:
 *      '422':
 *        description: invalid user _id
 *      '401':
 *        description: invalid old password
 *      '200':
 *        description: the target user password is updated in the database
 *      '400':
 *        description: error in the request sent to the database
 *    tags:
 *      - User
 */

user_Router.put("/password", authenticate , async (req, res) => {
  const id = req.body._id;
  const update = req.body.update;
  let oldpassUser;
  if (!id) {res.sendStatus(422);}
   oldpassUser = await User.findById(id);
   const new_hashedPassword = bcrypt.hashSync(update.password,10);
  //console.log("user data " , oldpassUser);
  const compare = await bcrypt.compare(update.oldPassword,oldpassUser.password);
  if(!compare)
  res.sendStatus(401);
  else{
  console.log("updated value is", update);
  const updated = await User.findByIdAndUpdate(id, {password:new_hashedPassword}, {new: true}).catch((err) => res.status(400).send(err));
  res.send(updated);
  }
});

/**
 * @swagger
 * /api/user/:id:
 *  delete:
 *    description: An endpoint to delete a user from the database.
 *    parameters:
 *      - in: path
 *        description: id of the user to be deleted
 *    responses:
 *      '401':
 *        description: the requester is not as admin, only an admin is allowed to delete a user from the database
 *      '200':
 *        description: the target user is deleted from the database
 *      '404':
 *        description: error in the request sent to the database
 *    tags:
 *      - User
 */


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