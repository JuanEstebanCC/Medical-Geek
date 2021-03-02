// Import all modules
const { Router } = require("express");
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const router = Router();
const User = require("../../models/User");
const chat = require("../../models/chat");


// End point to register a user
router.post("/register", async (req, res) =>{
const {email,full_name,password,specialization,usertype} = req.body;
let filter = { usertype: 3, specialization};
User.findRandom(filter, {}, {limit: 1}, async function(err, results) {
  if (!err) {
    if(usertype === 2){
      try{
        const assignedDoctor = results[0].full_name;
        const newUser = new User({
          email,full_name,password,specialization,usertype,assignedDoctor
        })
        newUser.password = await newUser.encryptPassword(newUser.password);
        await newUser.save();
        const id = newUser._id
        const token = jwt.sign({ id: newUser._id }, config.secret, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({ auth: true, token, email, id });
       }catch(err){
         console.log(err)
       }
    }else if(usertype === 3){
      try{
        const newUser = new User({
          email,full_name,password,specialization,usertype
        })
        newUser.password = await newUser.encryptPassword(newUser.password);
        await newUser.save();
        const id = newUser._id
        const token = jwt.sign({ id: newUser._id }, config.secret, {
          expiresIn: 60 * 60 * 24,
        });
        res.json({ auth: true, token, email, id });
       }catch(err){
         console.log(err)
       }
    }
  }
});

   

 
});

// End point to user login
router.get("/login", async (req, res) => {
  try {
    const {  email,password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("The email doesn't exist");
    }
    const passwordIsValid = await user.validatePassword(password);
    console.log(passwordIsValid)
    if (!passwordIsValid) {
      return res.status(404).status({ auth: false, token: null });
    }
    const id = user._id;
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 60 * 60 * 24,
    });
    res.json({ auth: true, token, message: 'logged', id });
  } catch (error) {
    console.log(error)
    res.status(500)
  }
});

router.get("/chats/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const chats = await chat.find({ participants: email });
    res.send(chats);
  } catch (error) {
    res.status(500).statusMessage("Internal error").send("Error");
  }
});

// End point for create a new chat
router.post("/new_chat", async (req, res) => {
  const { email_patient, email_doctor } = req.body;

  try {
    const newChat = await new chat({
      messages: [],
      participants: [email_patient, email_doctor],
    });
    newChat.save();
    res.send("Chat created");
  } catch (error) {
    res.send("Error").status(500).statusMessage("Culdn´t create the chat");
  }
});

// End point for create a new message
router.put("/new_message", async (req, res) => {
  const { email_patient, author, message } = req.body;

  try {
    const newChat = await chat.update(
      { participants: email_patient },
      { $push: { messages: { author: author, message: message } } }
    );
    res.send("message saved");
  } catch (error) {
    console.log(error);
    res.send("Error").status(500);
  }
});

//Export the module
module.exports = router;
