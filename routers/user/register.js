const express = require('express');
 const app = express();
const router1 = express.Router()
var validator = require("email-validator");

const { Client } = require('pg');

router1.use(express.json());
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

router1.post('/',(req,res)=>{
  let{name,email,password,password2} = req.body
  // console.log(name,email,password,password2);
  // res.send(req.body);
  let errors = []

  if(!name || !email || !password || !password2)
    errors.push({message: "please enter all the details"});

    if(password.length < 6)
      errors.push({message:"password should be atleast  6 characters"});

    if(!validator.validate(email))
    errors.push({message: "email format is wrong"})

    if(password != password2)
    errors.push({message:"password does not match"});

    if(errors.length > 0)
    {
      res.send(errors);
    }
    
  

})

module.exports = router1 ;