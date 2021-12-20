const express = require('express')
const app=express()


const db=require('./db')
const { updateOne } = require('./todo')
const Todo=require('./todo')

app.use(express.json())


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
        app.delete('/tasks', (req, res)=>{
          
            Todo.deleteOne({title: req.body.title}, (err, deleteObj) => {
                if (err) {
                  console.log("error", err)
                  res.status(404).json("todo not found")
                } else {
                  console.log(deleteObj)
                  res.json("deleted one todo successfully")
                }
              });
        })
        
      // update one todo function down below
        app.put("/tasks/:oldTitle", (req, res)=>{
            Todo.updateOne({title: req.params.oldTitle}, {title: req.body.newTitle} ,(err, updateObj)=>{
               if(err){
                   return handleError(err)
               }else{
                   if (updateObj.matchedCount=== 0 ){
                       res.status(404).json("todo not found ")
                   }else{
                       console.log(updateObj)
                   res.json("updated one todo successfully")
                   }
               }
            })
        })



        app.get("/completedTasks", (req, res)=>{
            Todo.find({isCompleted: true}, (err, data)=>{
                if(err){
                    console.log('ERROR: ', err)
                }else{
                    res.json(data)
                }
            })
        })

        app.get("/notCompletedTasks", (req, res)=>{
            Todo.find({isCompleted: false}, (err, data)=>{
                if(err){
                    console.log('ERROR: ', err)
                }else{
                    res.json(data)
                }
            })
        })



app.listen(5000, ()=>{
    console.log("server is working")
})