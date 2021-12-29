import { Axios } from 'axios'
import React, {useState} from 'react'
import axios from "axios"
import { Routes, Route, Link } from "react-router-dom";
import {useNavigate } from 'react-router-dom'

export default function Register() {


    const registerUser= (e)=>{
        e.preventDefault()
        console.log("register")
      const newUser = {
        email,
        password,
        username
      }

        
            axios
            .post("http://localhost:5000/users/register",newUser)
            .then((response) => {
              // console.log('RESPONSE: ', response);
              console.log("DATA: ", response.data);

              navigate("/login")
 
            })
            .catch((err) => {
              console.log("ERR: ", err);
            });
          };

          const navigate = useNavigate()
    


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
        

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

              
              <li class="nav-item login-nav">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li class="nav-item register-nav">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>




              

            </ul>
          </div>
        </div>
      </nav>


          <form id='register-form' action="">
          <h2 className='forms-titles'>Registration</h2>

            <label htmlFor="email-input">Email:</label>
            <input id='email-input' type="text" onChange={(e)=>{
              setEmail(e.target.value)
            }}
            value={email}/>
<br/>
            <label htmlFor="password-input">password:</label>
             <input id='password-input' type="password" onChange={(e)=>{
               setPassword(e.target.value)
             }}
             value={password}/>
<br/>

             <label htmlFor="username-input">username:</label>

            <input id='username-input' type="text" onChange={(e)=>{
                setUsername(e.target.value)

            }}
            value={username}/>
<br/>
             
              <Link className='link-to-login-register' to="/login"> have an account?</Link>
            <input class="login-register-button"type="submit" value="register" onClick={registerUser}/>



            </form>

        </div>
    )
}
