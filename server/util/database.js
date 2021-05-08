import mysql from "mysql";
import config from "../config/config.js";
import fs from "fs";

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  connectionLimit: 15,
});

pool.getConnection((err,connection) => {
  if (err) {
    console.log("Error in connection ", err);
  } else {
    console.log("sucsessfully");
    pool.query("SELECT * FROM Scoring_Factors ", (error, res) => {
      if (error) {
        console.log(error);
      } else {
        console.log(res);
        fs.w;
        fs.writeFile("Score_Dorm.txt", JSON.stringify(res), (err) => {
          if (err) return err;
          console.log("save!");
        });
        connection.release();
      }
    }); 
  }
});

export default pool;
