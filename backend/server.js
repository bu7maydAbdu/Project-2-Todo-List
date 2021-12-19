const express = require('express')
const app=express()


const db=require('./db')
const Todo=require('./todo')


app.get('/', (req, res)=>{
res.json('GET / is working')
})


app.listen(5000, ()=>{
    console.log("server is working")
})