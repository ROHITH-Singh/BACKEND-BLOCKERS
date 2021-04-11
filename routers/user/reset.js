const express = require('express');
 const app = express();
const router3 = express.Router()
var validator = require("email-validator");
var bcrypt = require('bcryptjs');
var d = new Date();
const { Client } = require('pg');

router3.use(express.json());
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

router3.post('/',async(req,res) => {
   let {email,password} = req.body;

   client.query(`UPDATE user_details SET password=$1 WHERE email=$2`,[password,email],(err,done)=>{
       if(err){
           res.send({message:false,type:err})
       }
       if(done){
           res.send({message:true,type:"Password is reseted"})
       }
   })

})


module.exports = router3 ;