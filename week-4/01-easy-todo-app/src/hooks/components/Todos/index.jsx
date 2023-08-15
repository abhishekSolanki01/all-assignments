import React from 'react';
import PropTypes from 'prop-types';
import useTodo from '../../useSetTodo';

import TodoList from "./todoList"
import TodoForm from "./todoForm"

Todos.propTypes = {
    
};

function Todos(props) {
    const [todos, setTodos]= useTodo([])

    return (
        <>
            <TodoList todo={todos} setTodos={setTodos}/>
            <TodoForm todos={todos} setTodos={setTodos}/>
        </>
    );
}

export default Todos;