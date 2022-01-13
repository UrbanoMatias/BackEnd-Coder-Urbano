import MongoContainer from "./mongoContainer.js";
import faker from 'faker'
export default class ProductsMongo extends MongoContainer{
    constructor(){
        super(
            'products',
            {
                name:{type:String, required:true},
                timestamp:{type:String, requiered:true},
                description:{type:String, requiered:true},
                code:{type:String, requiered:true},
                img:{type:String, requiered:true},
                price:{type:Number, requiered:true},
                stock:{type:Number, requiered:true}
            },{timestamps:true}
        )
    }

    createProducts = async (n) => {
        try {
            let documents = await this.collection.find();
            let prod = documents
            for (let i = 0;i<n;i++){
                prod.push({
                    name:faker.commerce.productName(),
                    timestamp:faker.date.past(),
                    code:faker.datatype.number(),
                    description:faker.lorem.words(7),
                    img:faker.image.image(),
                    price:faker.commerce.price(),
                    stock:faker.datatype.number(),


                })
            }
            try {
                let documents = await this.collection.insertMany(prod);
                return {status:"success",message:"producto creado",paylaod:documents}
            } catch (error) {
                return {status:"error",mesagge:"error" + error}
            }
                return {status:"success",message:"producto creado",paylaod:documents}
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }
}