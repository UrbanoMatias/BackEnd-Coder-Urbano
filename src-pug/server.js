import express from 'express';
import upload from './services/uploader.js';
import cors from 'cors';
import Contenedor from './classes/Contenedor.js';
import prodRouter from './routes/products.js';
import __dirname from './utils.js'
import { info } from 'console';

const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor();

const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en: ",PORT);
});

app.set('views','./views');
app.set('view engine','pug')
app.use(express.static('public'));
app.use('/api/products',prodRouter);


app.use(upload.single('file'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const files = req.files;
    if(!files||files.length===0){
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files);
});

app.get('/views/products',(req,res)=>{
    
    // contenedor.getAll().then(result=>{

    //     let food = result.payload;
    //     let preparedObject = {
            
    //         products: food
            
    //     }
    //     res.render('products',{preparedObject:food})

    // })

    
    
    // contenedor.getAll().then(result=>{
    //     let info = result.payload;
    //     let preparedObject = {
            
    //         products: info
            
    //     }
    //     console.log(preparedObject)
    //     res.render('productos',{preparedObject:info})
        
    // })
   

    contenedor.getAll().then(result=>{
        let info = result.payload;
        res.render('productos',{"arreglo":info})
        console.log(info)
    })

})

