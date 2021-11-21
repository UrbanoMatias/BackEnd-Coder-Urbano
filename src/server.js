const express = require('express');
const Contenedor = require('./classes/Contenedor');
const prodRouter = require('./routes/products');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en: "+PORT);
});
const contenedor = new Contenedor();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
});
const upload = multer({storage:storage});

app.use(upload.single('file'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/api/products',prodRouter);


app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const files = req.files;
    if(!files||files.length===0){
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files);
});

