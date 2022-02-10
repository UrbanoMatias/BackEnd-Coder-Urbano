import passport from 'passport';
import fbStrategy from 'passport-facebook';
import { userService } from "../services/services.js";

const facebookStratregy = fbStrategy.Strategy;

const initializePassportConfig = () => {
    passport.use('facebook',new facebookStratregy({
        clientID:"298286042282523",
        clientSecret:"56a7f2136f5f7f7d8f9e66d02cf068bb",
        callbackURL:"https://912b-190-14-35-179.ngrok.io/auth/facebook/callback",
        profileFields:['emails']
    },async (accessToken,refreshToken,profile,done)=>{
        try {
            console.log(accessToken);
            console.log(profile);
            let user = await userService.getBy({email:profile.emails[0].value});
            done(null,user)
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        user.findById(id,done);
    })
}

export default initializePassportConfig;