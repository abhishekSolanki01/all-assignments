import { useEffect, useState } from 'react';
import { getTodos } from '../axios';


function useTodo() {
    const [todos, setTodos] = useState([])
    useEffect(()=>{
        fetchTodo()
    }, [])

    const fetchTodo = async () => {
        const todo = await getTodos()
        if(todo){
            setTodos(todo)
        }
    }

    return [todos, setTodos]

}

export default useTodo;