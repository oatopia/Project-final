import mysql from 'mysql'
import config from '../config/config.js';

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

connection.connect(err =>{
    if(err) throw err;
    console.log("sucsessfully")
})

export default connection;