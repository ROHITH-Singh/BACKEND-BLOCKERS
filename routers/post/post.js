const express = require('express');
 const app = express();
const router4 = express.Router()
var validator = require("email-validator");
var bcrypt = require('bcryptjs');
var d = new Date();
const { Client } = require('pg');

router4.use(express.json());
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

router4.post('/',async(req,res)=>{
 
  let {post,date,type,user_id} = req.body ;

  client.query(`INSERT INTO post(post,date,type,user_id) VALUES ($1,$2,$3,$4) RETURNING user_id,post`,[post,date,type,user_id],(err,result)=>{
    if(err){
      res.send({message:"false"},{type:err})
    }
    else{
      res.send(result);
    }
  })

})

module.exports = router4 ;