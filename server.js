const express=require("express");
const bodyparser=require("body-parser");
const request = require("request");
const https=require("https");
const { post } = require("request");
const { response } = require("express");
const { dirname } = require("path");
const app=express();

app.use(express.static("public"));

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    

    var data={
        members:[
            {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname 
            }
        }    
        ]
        
    };

    const jsonData=JSON.stringify(data);

    const url="https://us17.api.mailchimp.com/3.0/lists/7a220ad765";



    const options={
        method: "post",
        auth:"krishnanaayush:Apikey"
    };

    const request = https.request(url,options,function(response){
        response.on("data",function(data){

           console.log(JSON.parse(data)); 
        })
    });
    if(response.status == 200){
        res.sendFile(__dirname+"/sucess.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
   // request.write(jsonData);
    request.end();
    //console.log(firstname,lastname,email);
});

app.post("/failure.html",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("server is running on port 3000");
});


