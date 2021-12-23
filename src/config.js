import knex from "knex";
import __dirname from "./utils.js";

const database = knex({
    client:'sqlite3',
    connection:{filename:__dirname+'/db/products.sqlite'}
})

export default database;