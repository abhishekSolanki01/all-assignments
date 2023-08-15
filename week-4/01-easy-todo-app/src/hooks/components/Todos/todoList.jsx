import React from 'react';
import { removeTodo } from '../../../axios';
import useTodo from '../../useSetTodo';

function TodoList(props) {
    const {setTodos} = props
    const deleteTodo = async(_id) => {
        debugger
        console.log(_id);
        await removeTodo(_id);
        // console.log(removedTodo);
        setTodos(prev => {
            return prev.filter(el => el._id !== _id)
        } )
    }
    return (
        <div>
            {props.todo && props.todo.length > 0 && props.todo.map((el, i) => {
                return (
                    <div key={i}>
                        <label> Title : {el.title} </label>
                        <span>
                            <label>Description : {el.description}</label>
                            <button onClick={(e) => { deleteTodo(el._id) }} >Delete</button>
                        </span>
                    </div>
                )

            })}
        </div>
    );
}

export default TodoList;