import express from 'express';
import {engine} from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from "mongoose"
import upload from './services/uploader.js';
import cors from 'cors';
import Contenedor from './classes/Contenedor.js';
import prodRouter from './routes/products.js';
import usersRouter from './routes/users.js'
import __dirname, { normalizeMessages } from './utils.js';
import {Server} from 'socket.io';
import ios from 'socket.io-express-session';
import { messageService, userService } from './services/services.js';
import { initializePassport } from './passport-config.js';
import passport from 'passport';
import initializePassportConfig from './facebook/passport-config.js';

const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor();
const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en: ",PORT);
});
const connection = mongoose.connect('mongodb+srv://matias:123@e-commerce.zcznv.mongodb.net/E-commerce?retryWrites=true&w=majority')
const baseSession = (session({
    store:MongoStore.create({mongoUrl:'mongodb+srv://matias:123@e-commerce.zcznv.mongodb.net/session?retryWrites=true&w=majority'}),
    resave:false,
    saveUninitialized:false,
    secret:"chat"
}))

app.use(session({
    store:MongoStore.create({mongoUrl:'mongodb+srv://matias:123@e-commerce.zcznv.mongodb.net/session?retryWrites=true&w=majority'}),
    secret:"Urban0",
    resave:false,
    saveUninitialized:false
}))

export const io = new Server(server)
io.use(ios(baseSession))

// app.engine('handlebars',engine());
// app.set('views',__dirname+'/views');
// app.set('view engine','handlebars')

app.use(upload.single('file'));
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
initializePassport();
initializePassportConfig();
app.use(passport.initialize()); 
app.use(passport.session());

//FACEBOOK

app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}),(req,res)=>{

})

app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    failureRedirect:'/paginaDeFail'
}),(req,res)=>{
    res.send({message:"Finalmente, Logueado"})
})

//FACEBOOK

app.use('/api/products',prodRouter);
app.use('/api/users',usersRouter);

app.post('/register',passport.authenticate('register',{failureRedirect:'/failedRegister'}),(req,res)=>{
    res.send({message:"signed up"})
})

app.post('/failedRegister',(req,res)=>{
    res.send({error:"No se pudo autenticar"})
})

app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const files = req.files;
    if(!files||files.length===0){
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files);
});

app.get('/views/products',(req,res)=>{

    contenedor.getAll().then(result=>{
        let info = result.payload;
        let preparedObject = {
            products : info
        }
        res.render('products',preparedObject)
    })

})

//socket

io.on('connection', async socket=>{
    socket.broadcast.emit('thirdConneciton','Alguien se a unido al chat')
    console.log(`El socket ${socket.id} se ha conectado`)
    let products = await contenedor.getAll();
    socket.emit('updateProd',products)
    socket.on('message',async data=>{
        const user = await userService.findByUsername(socket.handshake.session.user.username)
        let message ={
            user:user._id,
            text:data.message
        }
        await messageService.save(message);
        const messages = await messageService.getAll();
        const objectToNormalize = await messageService.getDataToNormalize();
        const normalizedData = normalizeMessages(objectToNormalize);
        console.log(JSON.stringify(normalizedData,null,2))
        io.emit('messagesLog',normalizedData);
    })
})




