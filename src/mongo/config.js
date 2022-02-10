import __dirname from "../utils.js";
import dotenv from 'dotenv';
dotenv.config();

export default{
    mongo:{
        baseUrl: process.env.BASEURL 
    }
}