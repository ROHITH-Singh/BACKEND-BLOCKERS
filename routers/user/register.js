const express = require('express');
 const app = express();
const router1 = express.Router()

const { Client } = require('pg');


const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

router1.post('/',(req,res)=>{
 
  let { name ,email ,password ,password2} = req.body;
  res.send(name,email,password,password2);
  console.log(name,email,password,password2);
})

module.exports = router1 ;