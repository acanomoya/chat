var express = require('express');
var router = express.Router();
const User = require('../model/user.model')
const Message = require('../model/message.model')

router.get('/', (req, res)=>{
    res.redirect('/chat')
});

router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/login', (req, res)=>{
    res.render('login')
});

router.get('/chat', async (req, res)=>{
    if(!req.cookies['chat_login']) return res.redirect('/login?error=true');
    
    try{
        const user = await User.findById(req.cookies['chat_login'])
        const messages = await Message.find().sort({createdAt: -1}).limit(5).populate('user');
    
        res.render('chat', {user, messages})
    } catch(error) {
        console.log( error.message)
    }

})

module.exports = router