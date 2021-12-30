import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'




export default function Login(props) {


const [email, setEmail] = useState("")
const [password, setPassword] = useState("") 
const [loginStatus, setloginStatus] = useState(0)
const [loginMessage, setloginMessage] = useState()

const loginFunc =(e)=>{
e.preventDefault()


const logedUser ={
    email,
    password
}


axios
.post("http://localhost:5000/users/login",logedUser)
.then((response) => {
  // console.log('RESPONSE: ', response);
  setloginStatus(response.status)
  setloginMessage(response.data.message)
  props.setIsLoggedIn(true)
props.setUsername(response.data.username)
  console.log("DATA: ", response.data);
 
if (props.isLoggedIn === true && logedUser.email!=="" && logedUser.password!=="" ){

       navigate("/home")
}else {
  
  navigate("/login")
}


})
.catch((err) => {
  console.log("ERR: ", err);
  setloginStatus(err.response.status)
  setloginMessage(err.response.data.message)
});


}


const navigate = useNavigate()



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

              
              <li className="nav-item login-nav">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item register-nav">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>




              

            </ul>
          </div>
        </div>
      </nav>

           <form id='login-form' action="">
           <h2 className='forms-titles'>Log in</h2>

            <label htmlFor='email'>Email:</label>
            <input id="email" type="email" value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
            <br/>

            <label htmlFor='password'>password:</label>
            <input id="password" type="password" value={password} onChange={(e)=>{
                    setPassword(e.target.value)
            }}/>
            <br/>
             
             {/* herror handling for login  */}
             {loginStatus===200  && (<div className='alert alert-success alert-logged'>
              {loginMessage} 
            </div>)}
            
            {(loginStatus===400 || loginStatus===404) &&  (<div className='alert alert-danger alert-wrong'>
            {loginMessage} 
            </div>)}
             {/* herror handling for login  */}

           

            <Link className='link-to-login-register' to="/register">dont have an account?</Link>
            <input  className='login-register-button' type="submit" value="login" onClick={loginFunc} />
            

            </form>
        </div>
    )
}
