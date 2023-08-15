import axios from 'axios';
const url = 'http://localhost:3000/todos';

export const getTodos = async () => {
    const todo = await axios.get(url)
    if(!todo.data){
        return []
    }else{
        return todo.data
    }
}

export const addTodo = async (todoData) => {
    const addTodo = await axios.post(url, todoData)
    return addTodo.data;
}

export const removeTodo = async (id) => {
    debugger
    const deleteTodo = await axios.delete(`${url}/${id}`);
    return deleteTodo
}




