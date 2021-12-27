import React, { useState } from 'react'
import axios from "axios"




export default function Login() {


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

})
.catch((err) => {
  console.log("ERR: ", err);
});


}




    return (
        <div>
           <form action="">
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

            <input type="submit" value="login" onClick={loginFunc}/>
            </form>
        </div>
    )
}




