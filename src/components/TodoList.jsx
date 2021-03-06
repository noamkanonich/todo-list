import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {

    const initialState = JSON.parse(localStorage.getItem("todos")) || [];

    const [todos, setTodos] = useState(initialState);

    function addTodoTask(todo){
        if (!todo.description || /^\s*$/.test(todo.description)) {
            return;
        }
    
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    }

    function updateTodoTask(todoId, newTodoValue) {
        if (!newTodoValue.description || /^\s*$/.test(newTodoValue.description)) {
            return;
        }

        setTodos(prevTodoTask => prevTodoTask.map(setItem => (setItem.id === todoId ? newTodoValue : setItem)));
    }

    function completedTodoTask(id){
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }
    
    function removeTodoTask(id){
        const removedTodosArray = [...todos].filter(todo => todo.id !== id);
        setTodos(removedTodosArray);
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))}, [todos]);

    return (
        <>
            <h1>Todo List App</h1>
            <TodoForm onSubmit={addTodoTask} />
            <Todo
                todos={todos}
                completedTodoTask={completedTodoTask}
                removeTodoTask={removeTodoTask}
                updateTodoTask={updateTodoTask}
            />
        </>
        );
    }

export default TodoList;
