const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const app = express();



app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json())
app.use(cors());
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.post('/ping', function (req,res,next) {
  return res.send('pong');
})
app.post('/raju',(req,res,next)=>{
  //console.log("request recieved");
  let sendI;
  console.log(req.body);
  axios.post('http://192.168.43.151:5002/remover', {
    file: req.body.dataB,
    lastName: 'Hindustani'
  })
  .then(function (response) {
    //res.body = "";
    console.log(response.data)
    sendI = 'data:image/png;base64,'+response.data.image;
    let inColors = response.data.color.map((color) => {
        color = color.substring(1); // remove #
        color = parseInt(color, 16); // convert to integer
        color = 0xFFFFFF ^ color; // invert three bytes
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color; // prepend #
        return color;;
    })
    let resData = {
      colors: inColors,
      image: sendI
    }
    //let url = URL.createObjectURL(sendI);
    //console.log(url)
    return res.send(resData);
  })
  .catch(function (error) {
    console.log(error);
    return res.send("Error")
  });

});

app.get('/', function (req,res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 8080);
