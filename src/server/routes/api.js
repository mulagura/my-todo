const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo',{useMongoClient:true}, (err)=>{
  if(err){
    console.error(err);
  }
  else{
    console.log("Connected to MongoDb Successfully !");
  }
});

mongoose.Promise = global.Promise;

const todoModel = require('../models/model');


router.get('/test',(req,res)=>{
    console.log("get /test is consuming");
    res.json({msg:"get /test in res,json equal to res.send but in json"});
});

//get method
router.get('/getItems',(req,res) => {
      console.log("/getItem in progress");

        todoModel.find((err,data) => {
            if(err){
              console.error(err);
              res.json(err);
            }
            else{
               res.json(data);
            }
        });

});

//post method

  router.post('/postItem',(req,res)=>{
     console.log("/postItem is being executed");

        let newItem = new todoModel({
          itemName:req.body.itemName,
          itemDone:req.body.itemDone
        });

        newItem.save((err,data)=>{
          if(err){
            console.error(err);
            res.json(err);
          }
          else{
            //res.json("Posted Data Successfully!");
             res.json(data);
          }
        });

  });

//put method

    router.put('/updateItem/:id',(req,res)=>{
          console.log("/updating by id");

          todoModel.findByIdAndUpdate( {_id:req.params.id}, { $set:{itemName:req.body.itemName} }, (err,data)=>{
              if(err){
                console.error(err);
                res.json(err);
              }
              else{
                //res.json("Data Updated Successfully!");
                   res.json(data);
              }
          });

    });


//delete method

      router.delete('/deleteItem/:id',(req,res)=>{
          console.log("/deleteItem by id");

            todoModel.findByIdAndRemove( {_id:req.params.id},(err,data)=>{
                if(err){
                  console.error(err);
                  res.json(err);
                }
                else{
                  //res.json("Deleted Successfully!");
                     res.json(data);
                }

            });

      });


module.exports = router;
