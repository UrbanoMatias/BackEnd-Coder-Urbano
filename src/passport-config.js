import passport from 'passport';
import local from 'passport-local';
import {userService} from '../src/services/services.js';
import {createHash, isValidPassword} from '../src/utils.js';
const LocalStrategy = local.Strategy;

export const initializePassport = () => {
    passport.use('register', new LocalStrategy({passReqToCallback:true},async(req,username,password,done)=>{
        try {
            let user = await userService.findByUsername(username);
            if(user) return done(null,false);
            const newUser = {
                username:username,
                password:createHash(password),
                email:req.body.email,
                first_name:req.body.first_name,
                last_name:req.body.last_name
            }
            try {
                let result = await userService.createObject(newUser);
                return done(null,result)
            } catch (error) {
                return done(error)
            }
        } catch (error) {
            return done(error)
        }
    }))
    passport.use('login',new LocalStrategy(async(username,password,done)=>{
        try {
            let user = await userService.findByUsername({username:username});
            if(!user) return done(null,false,{message:"El usuario no existe"});
            if(!isValidPassword(user,password)) return done(null,false,{message:"Contraseña invalida"});
            console.log("LOGUEADO");
            return done(null,user)
        } catch (error) {
            console.log(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        userService.findById(id,done);
    })
}