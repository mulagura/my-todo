const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const PORT = 4200;

const api = require('./src/server/routes/api');

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/',api);
// app.use('/',(req,res)=>{
//     res.json('Wlcome to server');
// });

app.use(express.static(path.join(__dirname,'dist')));

app.get('*',(req,res) => {
      res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.listen(PORT,() => {
  console.log("Server listening on localhost:"+PORT);
});
