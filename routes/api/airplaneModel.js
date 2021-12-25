// routes
const express = require("express");
const airplaneModel_router = express.Router();
const AirplaneModel = require("../../models/AirplaneModel");
const authenticate = require("./Authentication");

/**
 * @swagger
 * /api/airplaneModel/:
 *  get:
 *    description: An endpoint to search the airplane models in the database
 *    parameters:
 *      - in: query
 *        description: json indication the exact search criteria for airplane models
 *    responses:
 *      '401':
 *        description: the requester is not as admin
 *      '200':
 *        description: requested airplane models are returned to the requester
 *      '404':
 *        description: error in the request sent to the database
 */

airplaneModel_router.get("/", authenticate , function (req, res, next) {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  const queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  const regex = /\b(gt|gte|lt|lte|in)\b/g;
  queryStr = queryStr.replace(regex, "$$" + "$1");
  AirplaneModel.find(JSON.parse(queryStr))
    .then((airplaneModels) => res.json(airplaneModels))
    .catch((err) => res.status(404).json({ msg: "No models are found" }));
});

/**
 * @swagger
 * /api/airplaneModel/showAllModels:
 *  get:
 *    description: An endpoint to get all the airplane models in the database
 *    responses:
 *      '401':
 *        description: the requester is not an admin
 *      '200':
 *        description: all airplane models are returned to the requester
 *      '404':
 *        description: error in the request sent to the database
 */

airplaneModel_router.get("/showAllModels",authenticate, (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  AirplaneModel.find()
    .then((model) => {
      res.json(model);
    })
    .catch((err) => res.status(404).json({ msg: "No models are found" }));
});

/**
 * @swagger
 * /api/airplaneModel/:
 *  put:
 *    description: An endpoint to update an airplane model in the database. The request body should contain _id of target airplane model, and an update JSON that specifies which attributes to update.
 *        
 *    responses:
 *      '401':
 *        description: the requester is not as admin
 *      '200':
 *        description: the target airplane model is updated in the database
 *      '400':
 *        description: error in the request sent to the database
 */

airplaneModel_router.put("/", authenticate , (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  const id = req.body._id;
  const update = req.body.update;
  AirplaneModel.findByIdAndUpdate(id,update)
  .then(() => {
    res.send("done");
  })
  .catch(err => res.status(400).send(err));
});

/**
 * @swagger
 * /api/airplaneModel/:id:
 *  delete:
 *    description: An endpoint to delete an airplane model from the database.
 *    parameters:
 *      - in: path
 *        description: id of the airplane model to be deleted
 *    responses:
 *      '401':
 *        description: the requester is not as admin
 *      '200':
 *        description: the target airplane model is deleted from the database
 *      '404':
 *        description: error in the request sent to the database
 */

airplaneModel_router.delete("/:id",authenticate ,  async (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  try {
    const airplaneModel = await AirplaneModel.findByIdAndDelete(req.params.id);
    const Flight = require("../../models/Flight");
    await Flight.deleteMany({airplaneModelID:airplaneModel._id});
    if (airplaneModel) res.send(airplaneModel);
    else
      res.status(404).json({ msg: `No AirplaneModel with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});

/**
 * @swagger
 * /api/airplaneModel/:id:
 *  get:
 *    description: An endpoint to get a specific airplane model from the database.
 *    parameters:
 *      - in: path
 *        description: id of the requested airplane model
 *    responses:
 *      '200':
 *        description: the target airplane model is retrieved from the database
 *      '404':
 *        description: error in the request sent to the database
 */


airplaneModel_router.get("/:id",authenticate ,  async (req, res) => {
  console.log("here here");
  try {
    const airplaneModel = await AirplaneModel.findById(req.params.id);
    if (airplaneModel) res.send(airplaneModel);
    else
      res.status(404).json({ msg: `No AirplaneModel with id ${req.params.id} found` });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: `${req.params.id} is not a correct id` });
  }
});

/**
 * @swagger
 * /api/airplaneModel/:
 *  post:
 *    description: An endpoint to create an airplane model in the database. The airplane model JSON is added in the request body.
 *    responses:
 *      '200':
 *        description: the target airplane model is added to the database
 *      '401':
 *        description: the requester is not an admin
 *      '404':
 *        description: error in the request sent to the database
 */

airplaneModel_router.post("/",authenticate , async (req, res) => {
  if(!req.user.isAdmin){
    return res.sendStatus(401);
  }
  AirplaneModel.create(req.body)
  .then(result => {res.send(result);})
  .catch(err => {res.status(400).send(err)});
});

module.exports = airplaneModel_router;
