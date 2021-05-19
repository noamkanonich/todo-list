import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FiCheckCircle } from 'react-icons/fi';

function Todo(props){
  const [editTodo, setEdit] = useState({
    id: null,
    value: ''
  });

  function submitTodoUpdate(value){
    props.updateTodoTask(editTodo.id, value);
    setEdit({
      id: null,
      value: ''
    });
  }

  if (editTodo.id) {
    return <TodoForm edit={editTodo} onSubmit={submitTodoUpdate} />;
  }

  return props.todos.map((todo, index) => (

    <div className={todo.isComplete ? 'todo-list-row todo-complete' : 'todo-list-row'} key={index}>
      
      <div key={todo.id} onClick={() => props.completedTodoTask(todo.id)}>
        <span>{todo.date} | </span>
        <span>{todo.description}</span>
      </div>

      <div className='buttons'>

        <FiCheckCircle 
            className='complete-button'
            key={todo.id} 
            onClick={() => props.completedTodoTask(todo.id)}
        />

        <RiCloseCircleLine
            className='delete-button'
            onClick={() => props.removeTodoTask(todo.id)}
        />

        <TiEdit
            className='edit-button'
            onClick={() => setEdit({ id: todo.id, value: todo.description })}
        />

      </div>
    </div>
  ));
};

export default Todo;