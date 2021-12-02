// routes
const express = require("express");
const airplaneModel_router = express.Router();
const AirplaneModel = require("../../models/AirplaneModel");



airplaneModel_router.get("/", function (req, res, next) {
  const queryObj = { ...req.query };
  let queryStr = JSON.stringify(queryObj);
  const regex = /\b(gt|gte|lt|lte|in)\b/g;
  queryStr = queryStr.replace(regex, "$$" + "$1");
  AirplaneModel.find(JSON.parse(queryStr))
    .then((airplaneModels) => res.json(airplaneModels))
    .catch((err) => res.status(404).json({ msg: "No models are found" }));
});

airplaneModel_router.get("/showAllModels", (req, res) => {
  AirplaneModel.find()
    .then((model) => {
      res.json(model);
    })
    .catch((err) => res.status(404).json({ msg: "No models are found" }));
});

airplaneModel_router.put("/", (req, res) => {
  const id = req.body._id;
  const update = req.body.update;
  AirplaneModel.findByIdAndUpdate(id,update)
  .then(() => {
    res.send("done");
  })
  .catch(err => res.status(400).send(err));
});


airplaneModel_router.delete("/:id", async (req, res) => {
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

airplaneModel_router.post("/", async (req, res) => {
  AirplaneModel.create(req.body)
  .then(result => {res.send(result);})
  .catch(err => {res.status(400).send(err)});
});

module.exports = airplaneModel_router;
