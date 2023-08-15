import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { addTodo } from '../../../axios';

function TodoForm(props) {
    const {setTodos} = props
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")

    const saveTodo = async (e) => {
        e.preventDefault()
        console.log( title, description);
        const add = await addTodo({title, description});
        if(add){
            setTodos(prev => ([...prev, {title, description}]))
            setTitle("")
            setDescription("")
        }
        // const saveTodo = await axios.post()
    }
    return (
        <form onSubmit={saveTodo}>
            <label>
                Title:
                <input type="text" name="name" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            </label>
            <label>
                Description:
                <input type="text" name="desc" value={description} onChange={(e) => { setDescription(e.target.value) }}/>
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}


export default TodoForm;