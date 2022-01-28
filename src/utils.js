import {fileURLToPath} from 'url';
import {dirname} from 'path';
import { normalize,schema } from 'normalizr';
import bcrypt from 'bcrypt';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export default __dirname;

//  NORMALIZR

export const normalizeMessages = (data) =>{
    const users = new schema.Entity('users',{},{idAttribute:'_id'});
    const messages = new schema.Entity('messages',{
        user:users
    },{idAttribute:'_id'});
    const parentObject = new schema.Entity('parent',{
        messages:[messages]
    });
    const normalizeObject = normalize(data,parentObject)
    return normalizeObject;

}

// BCRYPT

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password)