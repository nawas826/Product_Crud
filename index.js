const express = require("express");
const PORT = 3000;
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

var User=require('./models/user');
var db=require('./mysetup/myurl').myurl;


var urlencodedParser = bodyparser.urlencoded({ extended: false });
var jsonparser=bodyparser.json();


mongoose.connect(db).then(()=>{
    console.log("Database is connected");
}).catch(err=>{
    console.log("Error is "+ err.message);
})


app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/signup", (req, res) => {
    console.log("Sign up Get works")
    res.sendFile(__dirname+"/"+"templates/signup.html");
});
app.get("/signin", (req, res) => {
    console.log("Sign in Get works")
    res.sendFile(__dirname+"/"+"templates/signin.html");
});

app.post('/register', urlencodedParser, function (req, res) {
    console.log("Post work")
    // Prepare output in JSON format
    const newuser=new User(req.body);
    console.log(newuser);
  
  if(newuser.password!=newuser.cpswd){
      return res.status(400).json({message: "password not match"});
  }
  User.findOne({email:newuser.email},function(err,user){
    if(user) return res.status(400).json({ auth : false, message :"Email exits"});

    newuser.save((err,doc)=>{
        if(err) {
            console.log(err);
            return res.status(400).json({ success : false});
        }
            return res.status(200).json({succes:true,user : doc});
    });
    
});

  //  res.end(JSON.stringify(response));
 })

app.listen(PORT, () => console.log("server started on port 3000"));

 //login
 app.post('/login',urlencodedParser,function(req,res){

    var userCred={};

    userCred.email=req.body.email;
    userCred.password=req.body.password;
    console.log("Signin Post work");
    console.log(req.body);
    User.findOne({email:req.body.email},function(err,profile){

        if(!profile){
            return res.status(500).send("User not exist");
        }
        else{
            console.log(profile);
            console.log(profile.email);
            console.log(profile.password);
            if (req.body.password == profile.password && userCred.email==profile.email){
                return res.status(200).send("User authenticated");
            }
            else {
                return res.status(500).send("Log in failed, please check your credentials");
            }
            
        }

    });

});


app.listen(process.env.PORT, () => console.log("server started on port 3000"));
