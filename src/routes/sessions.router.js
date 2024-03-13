const {Router} = require('express');
const passport = require('passport');

const sessionRouter = Router();


sessionRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), async( req, res)=>{})

sessionRouter.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/login'}), async (req, res)=>{
    
    req.session.user = {
        name: req.user.first_name,
        email:  req.user.email,
        age: req.user.age
    }
    
    res.redirect('/home')
})

module.exports = sessionRouter;