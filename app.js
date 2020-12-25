const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const city=req.body.city;
  https.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7a27de39e6615d8983d71d4beddc57e6&units=metric",function(response){
    response.on("data",function(data){
      const obj=JSON.parse(data);
      res.write("<h1> Weather in "+city+"</h1>");
      res.write("<p>Temperature: "+obj.main.temp+"</p><p>Humidity: "+obj.main.humidity+"%</p><p>"+obj.weather[0].description+"</p>");
      const url="https://openweathermap.org/img/wn/"+obj.weather[0].icon+"@2x.png";
      res.write("<p><img src="+url+" alt='icon'></p>");
      res.send();
    });
  });
});
app.listen(3000,function(){
  console.log("Server running");
});
