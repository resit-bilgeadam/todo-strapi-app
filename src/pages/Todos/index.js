import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import TodoCard from '../../components/TodoCard';
import styles from './Todos.module.scss';

function Todos() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState(null);

    const fetchTodos = async () => {
        const response = await fetch('http://localhost:1337/todos');
        const data = await response.json();

        setTodos(data);
    }

    const deleteTodo = async (id) => {
        console.log('DELETE TODO', id);
        const response = await fetch(`http://localhost:1337/todos/${id}`, {
            method: 'DELETE'
        })

        const data = await response.json()
        console.log(data)

        fetchTodos()
    }

    const editTodo = (id) => {
        console.log('Edit Todo', id);
        navigate(`${id}`)
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h1>Todos Page</h1>

            <div className={styles.todosWrapper}>
                {
                    todos ?
                    todos.map(todo => <TodoCard
                                        key={todo.id} 
                                        todo={todo} 
                                        onDelete={deleteTodo}
                                        onEdit={editTodo} />) :
                    <h3>...LOADING</h3>
                }
            </div>
        </div>
    )
}

export default Todos;
