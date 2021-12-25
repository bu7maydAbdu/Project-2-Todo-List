const express = require('express')
const app=express()
const cors=require("cors")


const db=require('./db')
const { updateOne } = require('./todo')
const Todo=require('./todo')

app.use(express.json())
app.use(cors())


app.get('/', (req, res)=>{
res.json('GET / is working')
})



// get all tasks function  app.get()
app.get('/tasks', (req, res)=>{
    Todo.find({}, (err, data)=>{
        if(err){
            console.log('ERROR: ', err)
        }else{
            res.json(data)
        }
    })
    
    })
    

// a function to get elements with either true or false isCompleted  depending on what the user enter
app.get("/filter", (req, res)=>{
    Todo.find({isCompleted:req.query.isCompleted}, (err, data)=>{
        if(err){
            console.log('ERROR: ', err)
        }else{
            res.json(data)
        }
    })
})



// this function creates new todo 
    app.post('/tasks', (req, res)=>{
        
        Todo.create(req.body, (err, newData)=>{
            if(err){
                console.log('ERROR: ', err)
            }else{
                res.status(201).json(newData)
                console.log('created new todo successfully', newData)
            }
        })
        
        })







         //delete  one todo function down below
        
   app.delete("/tasks/:id", (req, res) => {
    
  
    Todo.deleteOne({ _id: req.params.id }, (err, deleteObj) => {
      if (err) {
        console.log("ERROR: ", err);
      } else {
        deleteObj.deletedCount === 1
          ? res.json("Delete one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    });
  });




     // this function deletes completed tasks
     app.delete('/tasks', (req, res)=>{
          
        Todo.deleteMany({isCompleted: true}, (err, deleteObj) => {
            if (err) {
              console.log("error", err)
              
            } else {
                console.log(deleteObj);
                deleteObj.deletedCount === 0
                  ? res.status(404).json("There is no completed todo found")
                  : res.json("Delete all completed todos successfully");
            }
          });
    })
        




      // update one todo function down below
        
app.put("/tasks/:id", (req, res) => {
    
    Todo.updateOne(
      { _id: req.params.id },
      { title: req.body.newTitle },
      (err, updateObj) => {
        if (err) {
          res.status(400).json(err);
        } else {
          console.log(updateObj);
          updateObj.modifiedCount === 1
            ? res.json("Update one todo successfully")
            : res.status(404).json("This todo is not found");
        }
      }
    );
  });






        
  // this function updates the state of completion of a task 
        app.put('/tasks/:id/:isCompleted' , (req, res)=>{
          Todo.updateOne({_id: req.params.id}, {isCompleted: req.params.isCompleted}, (err, updatedObj)=>{
              if(err){
                  console.log("error", err)
              }else{
                  console.log(updatedObj)
                  updatedObj.modifiedCount===1
                   ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
                 

              }
          })


        })

       



app.listen(5000, ()=>{
    console.log("server is working")
})