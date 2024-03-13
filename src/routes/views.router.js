const {Router} = require('express');

const viewsRouter = Router();


viewsRouter.get('/login', (req,res)=>{
    res.render('login')
})

viewsRouter.get('/home', (req,res)=>{
    res.render('home', {user: req.session.user})
})


module.exports = viewsRouter;