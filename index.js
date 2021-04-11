const express = require('express');
const app = express();
// const cors = require('cors')

const session = require('express-session');
const flash   = require('express-flash');

const port = process.env.PORT || 9000

const { Client } = require('pg');


const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
app.use(session({
  secret: 'secret',
  resave:false,
  saveUninitialized : false

}));

app.use(flash());

app.get('/',(req,res)=>{
res.send("hello")
})

const path1 = require('./routers/user/register')
app.use('/user/register',path1);

const path2 =  require('./routers/user/login')
app.use('/user/login',path2);



app.listen(port,function(){
    console.log('server started')
  })