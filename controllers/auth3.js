const mysql=require("mysql")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets")
const async = require("hbs/lib/async")

exports.register=(req,res)=>{

    console.log(req.body)
    const{Date,Time,customers,Note}=req.body
    console.log(Date,Time);
   
    db.query('SELECT * FROM tables WHERE  time=?',[Time],(err,results)=>{
        if(err){
            console.log(err)
        }
        console.log(results)
         if(results.length > 1 ){
             db.query('DELETE * FROM tables WHERE time=?'),[Time],(err,results)=>{
                if(err){
                    console.log(err)
                }else{
                    return res.render('Booking',{
                        message:'The restaurant is full at this time'
                    })
                }

             }
            
         }
         else{
         db.query('INSERT INTO tables SET?',{date:Date,time:Time,num_of_people:customers,note:Note},(err,results)=>{
                 if(err){
                     console.log(err)
                 }
                 else{
                     console.log(results)
                 }
                    
        res.render("menu")
     });
        } 

       
    });           




    


}

console.log('hiii');