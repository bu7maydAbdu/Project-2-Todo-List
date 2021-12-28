import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'





export default function Login(props) {


const [email, setEmail] = useState("")
const [password, setPassword] = useState("") 

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
  console.log("DATA: ", response.data);
 props.setIsLoggedIn(true)
props.setUsername(response.data.username)
})
.catch((err) => {
  console.log("ERR: ", err);
});


}




    return (
        <div>
           <form id='login-form' action="">
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

            <Link className='link-to-login-register' to="/register">dont have an account?</Link>
            <input className='login-register-button' type="submit" value="login" onClick={loginFunc}/>
            

            </form>
        </div>
    )
}




