import express from 'express';
import session from 'express-session';
import {userService} from '../services/services.js';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { initializePassport } from '../passport-config.js';


const router = express.Router();
// const baseSession = (session({
//     store:MongoStore.create({mongoUrl:'mongodb+srv://matias:123@e-commerce.zcznv.mongodb.net/session?retryWrites=true&w=majority'}),
//     resave:false,
//     saveUninitialized:false,
//     secret:"chat"
// }))

router.use(session({
    store:MongoStore.create({mongoUrl:'mongodb+srv://matias:123@e-commerce.zcznv.mongodb.net/session?retryWrites=true&w=majority'}),
    secret:"Urban0",
    resave:false,
    saveUninitialized:false
}))

initializePassport();
router.use(passport.initialize()); 
router.use(passport.session());

// router.use(baseSession)

// router.post('/register',async (req,res)=>{
//     let user = req.body;
//     let result = await userService.save(user);
//     res.send({message:"Usuario creado", user:result});
// })

router.post('/login',async (req,res)=>{
    // let {email,password} = req.body;
    // if(!email||!password) return res.status(400).send({error:"datos incompletos"});
    // const user = await userService.getBy({email:email});
    // if(!user) return res.status(404).send({error:"Usuario no encontrado"});
    // if(user.password!==password) return res.status(400).send({error:"Contraseña incorrecta"});
    // req.session.user={
    //     username:user.username,
    //     email:user.email
    // // }
    // res.send({status:"Logeado"})
})
// router.post('/register',passport.authenticate('register',{failureRedirect:'/failedRegister'}),(req,res)=>{
//     res.send({message:"signed up"})
// })

// router.get('/currentUser',(req,res)=>{
//     res.send(req.session.user);
// })
// router.get('/register',(req,res)=>{
//     res.send("usuarios desde el ruter")
// })

export default router