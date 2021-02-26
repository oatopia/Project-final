import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import userRouter from './router/userRouter.js'
import matchRouter from './router/matchRouter.js'
import db from './util/database.js'
import session from 'express-session'
import path from 'path'

const __dirname = path.resolve();
const app = express();
const port = 4000;
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// app.get('/factor',(req,res)=>{
//     db.query("SELECT * FROM factor",(err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send(result);
//         }
//     });
// });


// app.post('/log',(req,res)=>{
//     const username = req.body.username;
//     const password = req.body.password;
//     db.query("SELECT * FROM userinformation WHERE username = ? ",username,(err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
            
//             if(username == result[0].username){
//                 if(password == result[0].password){
//                     res.send(result[0].type);
//                     console.log(result[0].type)
//                 }
//             }
//         }
//     });
// });




// app.post('/create',(req,res)=>{
//     const username = req.body.username;
//     const password =req.body.password;
//     const type = req.body.type;

//     db.query("INSERT INTO userinformation (username,password,type) VALUES(?,?,?)",[username,password,type],(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send("Value Inserted")
//         }
//     });

// })

app.use("/api/user",userRouter);
app.use("/api/match",matchRouter);

app.listen(4000,()=>{
    console.log('Server running port 4000');
});