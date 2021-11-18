const fs = require('fs');
const makeId = require('../utils');

//El producto tendra: ID, prenda, precio.
class Contenedor {
    async createProduct(product) {
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            if (products.some(prod => prod.prenda === product.prenda)) {
                //Si existe una prenda con ese nombre =>
                return {
                    status: "error",
                    message: "El producto ya existe"
                }
            } else {
                //Si no existe que lo cree
                let dataObj = {
                    id: makeId(5),
                    prenda: product.prenda,
                    precio: product.precio
                }
                products.push(dataObj)
                try {
                    await fs.promises.writeFile('./files/products.txt', JSON.stringify(products, null, 2))
                    return {
                        status: "success",
                        message: "Pruducto creado"
                    }
                } catch (error) {
                    return {
                        status: "error",
                        message: "No se pudo crear el producto"
                    }
                }
            }
        } catch {
            //El archivo no existe, por lo tanto, hay que crearlo
            let dataObj = {
                id: makeId(5),
                prenda: product.prenda,
                precio: product.precio
            }
            try {
                await fs.promises.writeFile('./files/products.txt', JSON.stringify([dataObj], null, 2));
                return {
                    status: "success",
                    message: "Producto creado con exito"
                }
            } catch (error) {
                return {
                    status: "error",
                    message: "No se pudo crear el producto"
                }
            }
        }
    }
    async getById(id){
        try{
            let data = await fs.promises.readFile('./files/products.txt','utf-8');
            let products = JSON.parse(data);
            let prod = products.find(v => v.id===id)
            if(prod){
                return {status:"success", payload:prod}
            }else{
                return {status:"error",message:"Producto no encontrado"}
            }
        }catch{
            return {status:"error",message:"Error al obtener el producto"}
        }
    }
    async getAll() {
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8')
            let product = JSON.parse(data);
            return {status:"success",payload:product};
        } catch{
            return {status: "error",message: "Error al obtener los productos"}
        }
    }
    async deleteById(id) {
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            let Newproduct = products.filter(prod => {
                return prod.id != id;
            });
            try {
                await fs.promises.writeFile('./files/products.txt', JSON.stringify(Newproduct, null, 2));
            } catch (error) {
                return {
                    status:"error",
                    message:"No se pudo encontrar el id"
                }
            }
        } catch (error) {
            return {
                status:"error",
                message:"No se pudo encontrar el id"
            }
        }
    }
    async deleteAll() {
        try {
            let data = await fs.promises.writeFile('./files/products.txt', [])
            return data
        } catch (error) {
            return {
                status:"error",
                message:"No se pudo borrar el arreglo"
            }
        }
    }
    async productRandom(product) {
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8')
            product = JSON.parse(data);
            let random = Math.floor(Math.random() * product.length)
            return product[random];
        } catch (error) {
            return {
                status:"error",
                message:"No se pudo encontrar el producto"
            }
        }
    }
}

module.exports = Contenedor;