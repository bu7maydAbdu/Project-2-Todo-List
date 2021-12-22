import React from 'react'

export default function Todo(props) {



  

  const {_id,
    title, isCompleted}=props.task
  return (
    <div className='Todo'>
       
     
      <input type="checkbox" checked={isCompleted} />
      <span style={{ textDecoration:isCompleted?'line-through':"none" }}>{title}</span>
      <button className='delete-button' onClick={()=>{
        props.dltTsk(_id)
      }}>X</button>
    </div>
  )}