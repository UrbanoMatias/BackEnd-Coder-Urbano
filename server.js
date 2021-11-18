const express = require('express');
const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log("Servidor escuchando en: "+PORT);
});

const Contenedor = require('./classes/Contenedor');
const contenedor = new Contenedor();

app.get('/products',(req,res)=>{
    contenedor.getAll().then(result=>{
        res.send(result)
    })
})

app.get('/productsRandom',(req,res)=>{
    contenedor.productRandom().then(result=>{
        res.send(result)
    })
})

app.delete('/deleteById/:pid', (res,req)=>{
    let id = parseInt(req.params.pid)
    contenedor.deleteById(id).then(result=>{
        res.send(result)
    })
})