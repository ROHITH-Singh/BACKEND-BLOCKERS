const express = require('express');
 const app = express();
const router1 = express.Router()
var validator = require("email-validator");
var bcrypt = require('bcryptjs');
var d = new Date();
const { Client } = require('pg');

router1.use(express.json());
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

router1.post('/',async(req,res)=>{
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
    else{
      // res.send("registered")
      let hashedPassword = await bcrypt.hash(password,10);
      // res.send(hashedPassword);
      client.query(`SELECT * FROM user_details
                    WHERE email = $1`,[email],(err,results)=>{
                      if(err){
                        throw err;
                      }
                    if(results.rows.length > 0)
                    { 
                      errors.push({message: "Email is already registered"})
                      res.send(errors);
                      
                    }
                    else{
                      console.log("into query part");
                      client.query(`INSERT INTO user_details(name, email, password,date)
                       VALUES($1, $2, $3)
                       RETURNING user_id,password `,
                       [name,email,hashedPassword,d],
                       (err1,results1)=>{
                        if(err1){
                          throw err1;
                        }
                      if(results1.rows.length > 0)
                      { 
                        errors.push({message: "u r  registered"})
                        res.send(errors);
                        
                      }
                         
                       });
                    }
                    }
      )
    }
    
  

})

module.exports = router1 ;