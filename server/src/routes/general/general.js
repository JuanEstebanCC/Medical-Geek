const {Router} = require('express');
const router = Router()
const users = require('../../models/users');
const chat  = require('../../models/chat');

//Validate if an user exists inside the database

router.get('/login', async(req,res)=>{
    const {password, email} = req.body

    try {

        const isUser = await users.find({password: password, email:email})
        res.send(isUser)
        
    } catch (error) {
        res.status(500).statusMessage('No se encontró al usuario. Verificar datos').send('Error')
    }

})

//  Get personal chats
router.get('/chats/:email', async(req,res)=>{
    const email = req.params.email

    try {

        const chats = await chat.find({participants: email})
        res.send(chats)
        
    } catch (error) {
        res.status(500).statusMessage('Internal error').send('Error')
    }

})


//Create chat after signup
router.post('/new_chat', async(req,res)=>{
    const {email_patient, email_doctor} = req.body

    try {
        const newChat = await new chat({messages: [], participants: [email_patient, email_doctor]})
        newChat.save()
        res.send('Chat created')
        
    }catch(error){
        res.send('Error').status(500).statusMessage('Culdn´t create the chat')
    }
})

//Messaging
router.put('/new_message', async(req,res)=>{
    const {email_patient, author, message} = req.body

    try {
        const newChat = await chat.update({participants: email_patient}, {$push:{messages:{author: author, message: message}}})
        
        res.send('message saved')
        
    }catch(error){
        console.log(error)
        res.send('Error').status(500)
    }
})

module.exports= router;