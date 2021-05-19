import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoForm(props) {

  const [todoInput, setTodoInput] = useState(props.edit ? props.edit.value : '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  function handleChange(event) {
    setTodoInput(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(); 
    props.onSubmit({
      id: uuidv4(),
      description: todoInput,
      date: date
    });
    setTodoInput('');
  }

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {
          props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={todoInput}
            maxlength="25"  
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>Save Changes</button>
        </>
      ) : (
        <>
          <input
            placeholder='Add A Todo Task'
            value={todoInput}
            maxlength="25"  
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
          />
          <button onClick={handleSubmit} className='add-button'>Add</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;