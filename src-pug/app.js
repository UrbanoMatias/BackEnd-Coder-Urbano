// const Contenedor = require('./classes/Contenedor');

// const contenedor = new Contenedor();

// contenedor.createProduct({
//     prenda: 'Pantalon moms',
//     precio: 9000,
// }).then(result=>{
//     console.log(result.message);
// })
// if (products.some(prod => prod.prenda === product.prenda)) {
//     //Si existe una prenda con ese nombre =>
//     return {
//         status: "error",
//         message: "El producto ya existe"
//     }

// contenedor.getById(1);

// contenedor.getAll();

// contenedor.deleteById("99466");

// contenedor.deleteAll();

// try {
//     let data = await fs.promises.readFile('./files/products.txt','utf-8');
//     let products = JSON.parse(data);
//     let id = products[products.length-1].id+1;
//     product = Object.assign({id:id},product);
//     products.push(product)
//     try {
//         await fs.promises.writeFile('files/products.txt',JSON.stringify(products,null,2));
//         return {status:"success",message:"Producto registrado"}
//     } catch (error) {
//         return {status:"error",message:"No se pudo registrar el producto" +error}
//     }
// } catch {
//     product = Object.assign({id:1},product)
//     try {
//         await fs.promises.writeFile('./files/products.txt',JSON.stringify([product],null,2));
//         return {status:"success",message:"Producto registrado"}
//     } catch (error) {
//         return {status:"error",message:"No se pudo registrar el producto" +error}
//     }
// }


