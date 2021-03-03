// Import all modules
const { Router } = require("express");
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const verifyToken = require('./verifyToken')
const {validation_Register} = require('../../validations/validations')

const User = require("../../models/User");
const chat = require("../../models/chat");

// End point to register a user
router.post("/register", async (req, res) =>{

    const {email,full_name,password,specialization,usertype} = req.body;
    const validate = await validation_Register.validateAsync(req.body)
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

//Validate if an user exists inside the database

router.get('/login', async(req,res)=>{
    const {password, email} = req.query

    try {

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


//  Get personal chats
router.get("/chats/:email", async (req, res) => {
    const email = req.params.email;
  
    try {
      const chats = await chat.find({ participants: email });
      res.send(chats);
    } catch (error) {
      res.status(500).statusMessage("Internal error").send("Error");
    }
  });




// End point to user login
router.get("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    const {  email,password } = req.query;
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
    res
      .status(500)
      .statusMessage("No se encontró al usuario. Verificar datos")
      .send("Error");
  }
});

//get personal chats
router.get("/chats/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const chats = await chat.find({"participants.email": email});
    console.log(chats)
    res.send(chats);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

<<<<<<< HEAD
// End point for create a new chat
router.post('/new_chat', async(req,res)=>{
  const {email_participant1, name_participant1,name_participant2, email_participant2} = req.body

  try {
      const newChat = await new chat({messages: [], participants: [{email: email_participant1, name: name_participant1},{email:email_participant2, name: name_participant2}]})
      newChat.save()
      res.send('Chat created')
      
  }catch(error){
      res.send('Error').statusCode(500)
  }
})


// End point for create a new message
router.put('/new_message', async(req,res)=>{
  const {email_participant1, email_participant2, author, email, message} = req.body

  try {
      const newChat = await chat.update({"participants.email": email_participant1 && email_participant2}, {$push:{messages:{email: email, author: author, message: message}}}, {function(error,result){
          if(error){
              res.send(error)
          }
      }})
      
      res.send('message saved')
      
  }catch(error){
      console.log(error)
      res.send('Error').statusCode(500)
  }
=======
//Create chat 
router.post('/new_chat', async(req,res)=>{
    const {email_participant1, name_participant1,name_participant2, email_participant2} = req.body

    try {
        const newChat = await new chat({messages: [], participants: [{email: email_participant1, name: name_participant1},{email:email_participant2, name: name_participant2}]})
        newChat.save()
        res.send('Chat created')
        
    }catch(error){
        res.send('Error').statusCode(500)
    }
})

//Messaging
router.put('/new_message', async(req,res)=>{
    const {email_participant1, email_participant2, author, email, message} = req.body

    try {
        const newChat = await chat.update({"participants.email": email_participant1 && email_participant2}, {$push:{messages:{email: email, author: author, message: message}}}, {function(error,result){
            if(error){
                res.send(error)
            }
        }})
        
        res.send('message saved')
        
    }catch(error){
        console.log(error)
        res.send('Error').status(500)
    }
>>>>>>> 0a3cdd89307037cc88a57bf87829d7841d892067
})

//Export the module
module.exports = router;
