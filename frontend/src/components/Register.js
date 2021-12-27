import { Axios } from 'axios'
import React, {useState} from 'react'
import axios from "axios"
import { Routes, Route, Link } from "react-router-dom";

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
 
            })
            .catch((err) => {
              console.log("ERR: ", err);
            });
          };
    


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
          <form action="">
            <label htmlFor="email-input">email:</label>
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

            <input type="submit" value="register" onClick={registerUser}/>



            </form>
            <Link to="/login"> have an account?</Link>

        </div>
    )
}
