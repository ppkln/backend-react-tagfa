const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'nodejs-react-ln'
});

app.get('/employees', (req,res)=>{
    db.query('select * from employee',(err,result)=>{
        if(err){
            console.log(err.message);
        } else{
            res.send(result);
        }
    })
})

app.post('/createEmployee',(req,res)=>{
    const email = req.body.email;
    const pws = req.body.pws;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;

    const currDate = new Date();
    const regisDate = currDate;

    if(email.length > 0 && pws.length > 0 && fname.length > 0 && lname.length > 0 && phone.length > 0){
        db.query("INSERT INTO employee (email, pws, fname, lname, phone,regisDate) VALUES (?,?,?,?,?,?)",
        [email,pws,fname,lname,phone,regisDate],(err,result)=>{
            if(err){
                console.log(err.message);
            } else {
                console.log("Added employee.");
                res.send(result);
            }
        })
    } else{
            return;
    }
})

app.put("/updateNewPhone",(req,res)=>{
    const id = req.body.id;
    const phone = req.body.phone;
    if(id !=="" && phone !==""){
        db.query("UPDATE employee SET phone=? where id=?",[phone,id],(err,result)=>{
            if(err){
                console.log("Update phone number failed.");
            } else {
                console.log("Updated phone number.");
                res.send(result);
            }
        })
    }
})
app.delete("/deleteEmployee/:id",(req,res)=>{
    const id = req.params.id;
    if(id!==""){
        db.query("delete from employee where id = ?",id,(err,result)=>{
            if(err){
                console.log(err);
            } else{
                console.log("Deleted employee.");
                res.send(result);
            }
        });
    }
})

app.listen('3001',()=>{
    console.log('Server is running on port 3001');
})