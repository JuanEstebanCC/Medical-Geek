//Import all modules
const { Router } = require("express");
const router = Router();
const {ObjectId} = require('mongodb');
//Import Schema
const diet = require("../../models/diet");
const User = require("../../models/User");

//User data
router.get("/user_data", async (req, res, next) => {
  const {id} = req.query;

  try {
    const user = await User.find({ "_id":ObjectId(id) });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//Diet according to user

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