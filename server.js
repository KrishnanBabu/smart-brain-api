const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const app=express();
const cors=require('cors');
var knex = require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Krishitha@1',
      database : 'smart-brain'
    }
  });   
app.use(bodyParser.json());

app.use(cors());
const database={
    users:[
        {
            id:'123',
            name:'John',
            email:'John@gmail.com',
            password:'cookies',
            entries:0,
            joined:new Date()
        },
        {
            id:'124',
            name:'Sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined:new Date()
        }
    ]
}

app.get('/',(req,res)=>{res.send(database.users)})

app.post('/signin',(req,res)=> { signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=> { register.handleRegister(req,res,db,bcrypt) })

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})


app.listen(process.env.PORT||3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`)
});