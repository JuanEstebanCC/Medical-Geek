//Import all modules
const { Router } = require("express");
const router = Router();
const {ObjectId} = require('mongodb');
//Import Schema
const diet = require("../../models/diet");
const User = require("../../models/User");
const chat = require("../../models/chat")

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

//Join into a grupal chat

router.put('/join_grupal_chat', async(req,res)=>{
  try {
    const {email, name, id} = req.body
    const joining = await chat.update({"_id": id}, {$push: {participants: {email: email, name:name}}})
    res.send(joining)
  } catch (err) {
    next(err)
  }
})


module.exports = router;