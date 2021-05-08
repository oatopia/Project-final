import express from 'express'
import cors from 'cors'
import bodyparser from 'body-parser'
import userRouter from './router/userRouter.js'
import matchRouter from './router/matchRouter.js'
import dormRouter from './router/DormRouter.js'
import adminRouter from './router/AdminRouter.js'
import visitorRouter from './router/visitorRouter.js'
const router = express.Router();
import db from './util/database.js'
import session from 'express-session'
import path from 'path'
import fileupload from 'express-fileupload'
const __dirname = path.resolve();
const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

// router.get('/', function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true); 
// });

app.get( '/', ( req, res ) => {
    console.log("FUck youuuuuuuuu heroku")
    res.send("Hello world")
} );
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
app.use('/api/dorm',dormRouter);
app.use('/api/Admin',adminRouter);
app.use('/api/visitor',visitorRouter);



const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server running port ${port}`);
});