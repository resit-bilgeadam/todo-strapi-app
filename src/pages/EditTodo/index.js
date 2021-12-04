import { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import styles from './EditTodo.module.scss';

function EditTodo() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isCompleted, setCompleted] = useState(false);
    
    const fetchTodo = async () => {
        const response = await fetch(`http://localhost:1337/todos/${id}`);
        const data = await response.json();

        setTitle(data.title);
        setText(data.text);
        setCompleted(data.isCompleted);
    }

    const editTodo = async (e) => {
        e.preventDefault();
        const updatedTodo = {id, title, text, isCompleted}

        const response = await fetch(`http://localhost:1337/todos/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTodo)
        })

        const data = await response.json();

        console.log(data);
        navigate('/todos');
    }

    useEffect(() => {
        fetchTodo()
    }, [id])

    return (
        <div>
            <h2>Edit Todo Page</h2>

            <div className={styles.formWrapper}>
                <form onSubmit={editTodo}>
                    <div className={styles.formGroup}>
                        <label htmlFor='todo-title'>Todo Title</label>
                        <input 
                            id='todo-title'
                            name='todo-title'
                            placeholder='Enter your title...'
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                    </div>


                    <div className={styles.formGroup}>
                        <label htmlFor='todo-text'>Todo Text</label>
                        <textarea 
                            id='todo-text'
                            name='todo-text'
                            placeholder='Enter your description...'
                            value={text}
                            onChange={e => setText(e.target.value)}></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <input 
                            type='checkbox'
                            id='todo-completed'
                            name='todo-completed'
                            checked={isCompleted}
                            onChange={e => setCompleted(e.target.checked)} />
                        <label>{isCompleted ? 'Completed' : 'Not Completed'}</label>
                    </div>

                    <button type='submit'>Save Todo</button>
                </form>
            </div>
        </div>
    )
}

export default EditTodo;
