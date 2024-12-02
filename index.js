import express from"express";
import axios from "axios";
import bodyParser from "body-parser";

const app= express();
const port=8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.ejs")
})
//we need to get the latitude and longitude first
const api_key="8b2828ee76bdbb8da3cd427493e1c68a";
//this is for weather prediction data
app.post("/submit",async (req,res)=>{
    const city=req.body.name;

    try{
        const result=await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${api_key}}`);
        const latt=result.data.lat;
        const long=result.data.lon;
        const result2= await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`);

        console.log(result.data);
        console.log(result2.data);
        res.render("index.ejs",{
            lat:latt,
            lon:long
        })

    }catch(error){
        console.log(error.response.data);
        res.status(500);

    }
})

app.listen(port,()=>{
    console.log(`server running on port${port}`);
})