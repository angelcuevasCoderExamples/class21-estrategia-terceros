const passport = require('passport');
const GithubStrategy = require('passport-github2');
const userModel = require('../models/user');

const initializePassport = ()=>{

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.fa76b0fb0120b86e',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        clientSecret: 'bf8648c047306c7252a68d8bb88143b7c5e3739b'
    }, async (_accessToken, _refreshToken, profile, done)=>{
        try {
            
            const user = await userModel.findOne({email: profile._json.email})

            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 0, 
                    email: profile._json.email
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            }else{
                return done(null, user)
            }

        } catch (error) {
            return done(error)
        }
    }))
}

passport.serializeUser((user, done)=>{
    done(null, user._id);
})

passport.deserializeUser(async (userId, done)=>{
    let user = await userModel.findOne({_id: userId});
    done(null, user) 
})


module.exports = initializePassport; 