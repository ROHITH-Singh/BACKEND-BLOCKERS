const express = require('express');
 const app = express();
const router5 = express.Router()
var validator = require("email-validator");
var bcrypt = require('bcryptjs');
var d = new Date();
const { Client } = require('pg');
const { query } = require('express');
var c = [];
router5.use(express.json());
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://ccaoexshbkbatc:f589d4327b348970d99039b08cdf668b40e1a77a8c262a2583fbfa65fd6f280a@ec2-52-21-153-207.compute-1.amazonaws.com:5432/dfl00icf43gult ',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

router5.post('/',async(req,res)=>{
    let type = req.query.type;
    let p_commentid = req.query.p_commentid ;
 
  let {user_id,comment,post_id} = req.body ;

  client.query(`INSERT INTO comment(user_id,comment,date,post_id,type) VALUES ($1,$2,$3,$4,$5) RETURNING comment_id,user_id,post_id,type`,[user_id,comment,d,post_id,type],(err,result)=>{
    if(err){
    res.send({message:"false"},{type:err});
    }
    else{
       
        c.push(result.rows[0]);
        console.log(c);
        if(result.rows[0].type=='reply'&& p_commentid){
            client.query(`INSERT INTO parent_child_comment(parent_comment_id,child_comment_id) VALUES ($1,$2) RETURNING  parent_comment_id,child_comment_id`,[p_commentid,result.rows[0].comment_id],(err,result1)=>{
                if(err){
                res.send({message:"false"},{type:err});
                }
                else{
                    console.log(result1.rows[0]);
                   c.push(result1.rows[0]);
                  
                }

    }
)}
res.send(c);



}});
       
                

 
    



})

router5.get('/',async(req,res)=>{
  let type = req.query.type;
  let p_commentid = req.query.p_commentid ;
  console.log(type)
  if(type){
    client.query(`SELECT * FROM  comment WHERE type = $1 and  post_id= $2`,[type,p_commentid],(err,result)=>{
        if(err){
          res.send({message:"false"},{type:err})
        }
        else{
            res.send(result.rows);
        }
      })

  }
  if(p_commentid && !type){
    client.query(`SELECT *
    FROM
       comment AS c
    JOIN parent_child_comment p ON c.comment_id = p.child_comment_id
    WHERE 
       p.parent_comment_id = $1`,[p_commentid],(err,result)=>{
        if(err){
          res.send({message:"false"},{type:err})
        }
        else{
            res.send(result.rows);
        }
      })

  }


})

module.exports = router5 ;

