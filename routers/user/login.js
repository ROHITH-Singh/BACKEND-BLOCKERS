const express = require('express');
 const app = express();
const router2 = express.Router()
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



router2.post('/', async(req,res)=>{
    let{email , password} = req.body

    client.query(
        `SELECT * FROM user_details WHERE email = $1`,[email],(err,result)=>{
            if(err){
                throw err ;
            }
            console.log(result.log)
            if(result.rows.length > 0)
            {   const user = result.rows[0];
                bcrypt.compare(password,user.password),(err, isMatch)=>{
                    if(err){
                        throw err;
                    }
                    if(isMatch){
                       res.send(user);
                    }
                    else{
                       res.send({message:"Password is incorrect"});
                    }
                }

            }
            else{
                res.send({message:"Email is not registerd"});
            }
        }
    )


});

















module.exports = router2 ;