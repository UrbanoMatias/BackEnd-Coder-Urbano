// import database from "../config.js";

// export default class Products{
//     constructor(){
//         database.schema.hasTable('ecommerce').then(result=>{
//             if(!result){
//                 database.schema.createTable('ecommerce',table=>{
//                     table.increments();
//                     table.string('name').notNullable();
//                     table.string('description').notNullable();
//                     table.string('code').notNullable();
//                     table.string('img').notNullable();
//                     table.integer('price').notNullable();
//                     table.integer('stock').notNullable();
//                     table.timestamps(true,true)
//                 }).then(result=>{
//                     console.log("products table created")
//                 })
//             }
//         })
//     }
//     getProducts = async () => {
//         try {
//             let products = await database.select().table('ecommerce')
//             return {status:"success",payload:products}

//         } catch (error) {
//             return {status:"erroe",message:error}
//         }
//     }
//     getProducById = async (id) => {
//         try {
//             let product = await database.select().table('ecommerce').where('id',id).first();
//             if(product){
//                 return {status:"success",payload:product}
//             }
//         } catch (error) {
//             return {status:"error",message:error}
//         }
//     }
//     createProducts = async (product) => {
//         try {
//             let exist = await database.table('ecommerce').select().where('code',product.code).first();
//             if(exist) return {status:"error",message:"code already exists"};
//             let result = await database.table('ecommerce').insert(product);
//             return {status:"success",payload:result}
//         } catch (error) {
//             return {status:"error",message:error}
//         }
//     }
//     updateProduct = async (id, body) => {
//         try {
//             let update = await database.table('ecommerce').where('id',id).update(body)
//             return {status:"success",payload:update}
//         } catch (error) {
//             return {status:"error",message:error}
//         }
//     }
//     deleteById = async (id) => {
//         try {
//             let borrar = await database.table('ecommerce').del().where('id',id)
//             return {status:"success",payload:borrar}
//         } catch (error) {
//             return {status:"error",message:error}
//         } 
//     }

// }