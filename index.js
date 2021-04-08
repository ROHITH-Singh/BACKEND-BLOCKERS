const express = require('express');
const app = express();
// const cors = require('cors')
const port = process.env.PORT || 9000

const { Client } = require('pg');


const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
client.query('SELECT * FROM user_details ',(err,res)=>{
    console.log(err,res);
    client.end()
})

app.listen(port,function(){
    console.log('server started')
  })