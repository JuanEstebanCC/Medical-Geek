//Import all modules
const { Router } = require("express");
const router = Router();
const {ObjectId} = require('mongodb');
//Import Schema
const diet = require("../../models/diet");
const User = require("../../models/User");

router.get("/user_patient", async (req, res, next) => {
  const {id} = req.query;

  try {
    const user = await User.find({ "_id":ObjectId(id) });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/diet", async (req, res, next) => {
    const {typeDiet} = req.query;
  
    try {
      const diets = await diet.find({ typeDiet: typeDiet });
      res.send(diets);
    } catch (error) {
      next(error);
    }
});


module.exports = router;