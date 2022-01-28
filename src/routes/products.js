import express from 'express';
import Contenedor from '../classes/Contenedor.js';
// import Products from '../services/Products.js';
import ProductsMongo from '../mongo/products.js';
const products = new ProductsMongo();
const contenedor = new Contenedor();
// const productsService = new Products();
const router = express.Router();

//GETS
router.get('/',(req,res)=>{
    productsService.getProducts().then(result=>{
        res.send(result);
    })
})

router.get('/test',(req,res)=>{
    let n = req.query.cant?parseInt(req.query.cant):5;
    products.createProducts(n).then(result=>{
        res.send(result);
    })
})

router.get('/:uid',(req,res)=>{
    let id = req.params.uid;
    id = parseInt(id);
    productsService.getProducById(id).then(result=>{
        res.send(result);
    })
})

//POST
router.post('/',(req,res)=>{
    let product = req.body;
    productsService.createProducts(product).then(result=>{
        res.send(result);
        if(result.status==="success"){
            contenedor.getAll().then(result=>{
                io.emit('updateProd',result)
            })
        }
    })
})

//PUT
router.put('/:uid',(req,res)=>{
    let id = parseInt(req.params.uid);
    let body = req.body
    productsService.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETE
router.delete('/:uid',(req,res)=>{
    let id = req.params.uid;
    id = parseInt(id);
    productsService.deleteById(id).then(result=>{
        res.send(result);
    })
})

export default router