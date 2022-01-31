import User from "../public/models/user.js";
import GenericQueries from "./genericQueries.js";

export default class UserService extends GenericQueries{
    constructor(dao){
        super(dao,User.model);
    }
    async findByUsername(username){
        return this.dao.findOne({username},User.model);
    }

    createObject = async (newUser) => {
        try {
            let find = await this.collection.find()
            if (find.some(u => u.username === newUser.username)){
                return {status:"error",message:"El usuario ya existe"}
            }else if (find.some(p => p.password === newUser.password)){
                return {status:"error",message:"El usuario ya existe"}
            }else{
                let documents = await this.collection.insertOne(newUser);
                return {status:"success",message:"Usuario creado",paylaod:documents}
            }
        } catch (error) {
            return {status:"error",mesagge:"error" + error}
        }
    }
}