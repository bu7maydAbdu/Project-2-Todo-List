import React from 'react'

export default function Todo(props) {



  

  const {_id,
    title, isCompleted}=props.task
  return (
    <div className='Todo'>
       
    
      <input className="checkbox" type="checkbox" defaultChecked={isCompleted} onClick={()=>{
        props.toggleTodo(_id, !isCompleted)
      }} />
      <span style={{ textDecoration:isCompleted?'line-through':"none" }}>{title}</span>
      <button className='delete-button' onClick={()=>{
        props.dltTsk(_id)
      }}><p className='x'>X</p></button>
    </div>
  )}