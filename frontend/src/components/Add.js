import React, { useState } from "react";

export default function Add(props) {
  const [newTitle, setNewTitle] = useState("");

  const createNewTodo = () => {
    //
    console.log("createNewTodo from ADD");
    // {"title":"task 5","isCompleted": false}
    props.createFunc({title: newTitle, isCompleted:false});
  };

  return (
    <div className="Add">
      <input
      className="input-new-task"
        type="text"
        placeholder="Write new title here ..."
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
      />
      <button  className="input-new-task-button" onClick={createNewTodo}>Create New Todo</button>
    </div>
  );
}