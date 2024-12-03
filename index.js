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
     
        
        const result2= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`);

        const latt=result2.data.coord.lat;
        const lon=result2.data.coord.lon;
        const rep=result2.data.weather[0].description;
        const tem=result2.data.main.temp;
        console.log(rep);
        res.render("index.ejs",{
            report:rep,
            lat:latt,
            lon:lon,
            temp:tem

        })

    }catch(error){
        console.log(error.response.data);
        res.status(500);

    }
})

app.listen(port,()=>{
    console.log(`server running on port${port}`);
})