const {Router} = require('express');
const router = Router()
const users = require('../../models/users');
const chat  = require('../../models/chat');

//Validate if an user exists inside the database

router.get('/login', async(req,res)=>{
    const {password, email} = req.query

    try {

        const isUser = await users.find({password: password, email:email})
        console.log(isUser)
        res.send(isUser)
        
    } catch (error) {
        res.status(500).statusMessage('No se encontró al usuario. Verificar datos').send('Error')
    }

})

//  Get personal chats
router.get('/chats/:email', async(req,res)=>{
    const email = req.params.email

    try {

        const chats = await chat.find({"participants.email": email})
        res.send(chats)
        
    } catch (error) {
        res.statusCode(500).send('Error')
    }

})


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
})

module.exports= router;