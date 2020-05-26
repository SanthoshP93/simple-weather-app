const request =  require('postman-request');
const http = require('http')

// request({url,json:true},(error,data)=>{
//     console.log(data.body.current.temperature)
// })

 const getWeather = (address,callback) =>{
   console.log(address+"edg")
   const url = "http://api.weatherstack.com/current?access_key=b2d5fac00bf1c9b56d1bd81294a0a6ea&query="+encodeURIComponent(address)+"&units=m";
//console.log(address+"dfd")
    request({url,json:true},(error,response)=>{
     // console.log(response.body.error)
   if(error){
   // console.log(error)
   callback('unable to connect!',undefined);
   }else if(response.body.error){
    //console.log(response.body.error+"ddd")
    callback('unable to get location',undefined)
   }else{
    callback(undefined,response.body)
    }
    })
 }

 module.exports = getWeather;

