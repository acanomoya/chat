const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/user.model');

router.post('/create', async (req, res)=>{
    
    req.body.password = bcrypt.hashSync(req.body.password, 7);

    try{        
        await User.create(req.body)
        res.redirect('/login');

    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async (req, res)=>{
    const user = await User.findOne({
        email: req.body.email
    });
    if(!user) return res.redirect('/login?error=true');

    const iguales = bcrypt.compareSync(req.body.password, user.password)
    if(!iguales) return res.redirect('/login?error=true');

    res.cookie('chat_login', user._id)
    res.redirect('/chat')

});

module.exports = router