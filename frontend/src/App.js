import React, { useState,useEffect } from "react";
import "./App.css";

import axios from "axios";
import Todo from "./components/Todo";
import Add from "./components/Add";

export default function App() {
  const [tasks, setTasks] = useState([]);


  useEffect(()=>{
    getData()
  },[])

  const getData = () => {
    // should bring data using axios
    // from backend (GET /tasks)
    axios
      .get(`http://localhost:5000/tasks`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };



  const postNewTodo = (body) => {
    // console.log("func postNewTodo from APP");
    // {"title":"task 5","isCompleted": false}
    axios
    .post("http://localhost:5000/tasks",body)
    .then((response) => {
      // console.log('RESPONSE: ', response);
      console.log("DATA: ", response.data);
      // setTasks(response.data);
      getData()
      // change react hooks state using spread operator
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
  };



// delete task feature  associated with the cross icon that delete a certain task
  const dltTask=(id)=>{
    axios
    .delete(`http://localhost:5000/tasks/${id}`)
    .then((response) => {
      // console.log('RESPONSE: ', response);
      console.log("DATA: ", response.data);
      // setTasks(response.data);
      getData()
      // change react hooks state using spread operator
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
  }


  //clear all compleated tasks function 
  const clearCompletdTasks=()=>{
    axios
    .delete(`http://localhost:5000/tasks`)
    .then((response) => {
      // console.log('RESPONSE: ', response);
      console.log("DATA: ", response.data);
      // setTasks(response.data);
      getData()
      // change react hooks state using spread operator
    })
    .catch((err) => {
      console.log("ERR: ", err);
    });
  }


  const filterTasks = (status) => {
    // should filter data using axios based on  its completion status ... this function works on both get pending and get completed buttons
   
    axios
      .get(`http://localhost:5000/filter?isCompleted=${status}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };



// a function associated  with the checkbox  to change its value  based on  either  the box is checked or not
  const toggleTodo = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/tasks/${id}/${newStatus}`)
      .then((response) => {
        // console.log('RESPONSE: ', response);
        console.log("DATA: ", response.data);
        getData();
        // change react hooks state using spread operator
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };


// a map to generate  the tasks  that are in the db 
  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo key={taskObj._id} task={taskObj} dltTsk={dltTask} toggleTodo={toggleTodo}/>
  ));

  return (
    <div className="App">
      <p className="app-title">Todooooo</p>
     
      {/* when click on this button 
      should call function bring Data */}
      {/* <button className="get-tasks" onClick={getData}>GET All TASKS</button> */}
      <div className="control-buttons">

      <button className="clear-all-button" onClick={clearCompletdTasks}>Clear all Completed tasks</button>

      <Add createFunc={postNewTodo} />

      <button className="get-pending-button" onClick={()=>{
             filterTasks(false)
      }}>Pending</button>

      <button className="get-completed-button" onClick={()=>{
             filterTasks(true)
      }}>Completed</button>

      </div>

      <div className="tasks-div">
        {/* added this div to make the tasks arrange in grids using css */}

     {mapOverTasks}
      </div>
      
    </div>
  );
}

