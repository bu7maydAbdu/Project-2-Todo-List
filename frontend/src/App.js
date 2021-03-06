import React, { useState,useEffect } from "react";
import "./App.css";

import axios from "axios";
import Todo from "./components/Todo";
import Add from "./components/Add";
import Register from "./components/Register";
import Login from "./components/Login";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




export default   function App() {
  const [tasks, setTasks] = useState([]);


  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [username, setUsername] = useState("")


  useEffect(()=>{
    getData()
  },[])



  const logoutFunc =()=>{
    setIsLoggedIn(false)
    setUsername("")
    navigate("/login")
  }

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


const navigate = useNavigate()

// a map to generate  the tasks  that are in the db 
  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo key={taskObj._id} task={taskObj} dltTsk={dltTask} toggleTodo={toggleTodo}/>
  ));


  return (
    <div className="App">


      {/* <p className="app-title">Todooooo</p> */}

      {/* <p>{username}</p> */}

 {/* <Link to="/home">Home</Link> {"  |  "}
      <Link to="/login">Login</Link> {"  |  "}
  <Link to="/register">Register</Link>  */}


      <Routes>
        <Route path="/" element={<Login/>}/>
      <Route path="/home" element={
      <div className="Home">

<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h1 className="app-title" href="#">
          Todooooo
          </h1>


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

            

             
              <li className="nav-item  home-nav ">
                <Link to="/home" className="nav-link navbar-dark ">
                  Home
                </Link>
              </li> 

              <div className="profile-card">
              <li className=" nav-item  profile-name ">
            <p className=" nav-link navbar-dark">

             {username}
            </p>

             </li>  


              <li className="nav-item">    

                <button className="logout logout-width-height" onClick={logoutFunc}>LogOut</button>
             
             
              </li>
              </div>

              

            </ul>
          </div>
        </div>
      </nav>
   
{/* when click on this button 
should call function bring Data */}
<button className="get-tasks" onClick={getData}>GET All TASKS</button>
<div className="control-buttons">

<button className="clear-all-button" onClick={clearCompletdTasks}>Clear all Completed tasks</button>

<Add createFunc={postNewTodo} />

<button className="get-pending-button" onClick={()=>{
       filterTasks(false)
}}>Pending</button>

<button className="get-completed-button" onClick={()=>{
       filterTasks(true)
}}>Completed</button>


{/* <button className="get-tasks" onClick={getData}>GET All TASKS</button> */}

</div>

<div className="tasks-div">
  {/* added this div to make the tasks arrange in grids using css */}

{mapOverTasks}


</div>
</div>
} />

        <Route path="/login" element={<Login isLoggedIn={isLoggedIn}  setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername} username={username}
        />} />
        <Route path="/register" element={<Register/>} />

      </Routes>





      
    </div>
  );
}





