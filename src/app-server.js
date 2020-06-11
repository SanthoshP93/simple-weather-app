const express = require('express')
const path = require('path')
const fs = require('fs')
const hbs = require('hbs')

const app = express()
//routes
const allRoutes = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')


const getWeather = require('./service')

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(allRoutes));
hbs.registerPartials(partialPath)


app.get('', (req, res) => {
  res.render('index', {
    title: 'Auther Details',
    name: 'Santhosh',
    age: '27'
  })
});

app.get('/contacts', (req, res) => {
  res.render('contacts', {
    title: 'Auther Details',
    name: 'Ganesh',
    age: '33'
  })
});

app.get('/weather',(req,res)=>{
  res.render('weather')
})

// app.get('/help', (req,res) => {
//   res.send('help page')
// })

// app.get('/about',(req,res) =>{
//   res.send('<h1>About us</h1>')
// })

app.get('/weathers', (req, res) => {
if(!req.query.address){
  return res.send({
    error:'Missing params'
  })
}
  getWeather(req.query.address,(error, resp) => {
   
    if(error){
      res.send({
        error
      })
    }
   
    else{
      let msg = "The current wheather is " + resp.current.temperature + " degree. but feels like " + resp.current.feelslike+" degree";
      console.log(error)
      res.send({
        location_details: resp.location,
        forecast: msg
      })
    }
   
  })



})

app.get('/getWeatherinfo', (req, res) => {
  if(!req.query.address){
    return 'Missing params'; 
  }
    getWeather(req.query.address,(error, resp) => {
     
      if(error){
        console.log(error)
        return res.send({error});
      }
      else{
        console.log(resp.current.temperature)
        let msg ="In "+resp.location.name+ ", The current wheather is " + resp.current.temperature + " degree. but feels like " + resp.current.feelslike+" degree";
        return res.send({msg});
      }
     
    })
  
  
  
  })

app.get('/createFile', (req, res) => {
  let obj = {
    name: "Kiran",
    designation: "CEO"
  }
  fs.writeFileSync('./store/person-data.txt', JSON.stringify(obj));
  res.send("saved file")
})
app.get('/readFile', (req, res) => {

  let data = fs.readFileSync('./store/person-data.txt');
  res.send(data.toString())
})

app.get('/updateFile', (req, res) => {
  let obj = {
    name: "Arun",
    designation: "CTO",
  }
  fs.appendFileSync('./store/person-data.txt', JSON.stringify(obj));
  res.send("updated file")
})

app.get('*', (req, res) => {
  res.send("page not found")
})


app.listen(port, () => {
  console.log('server '+port+' is up!')
})
