import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateTodo.module.scss';

function CreateTodo() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const createTodo = async (e) => {
        e.preventDefault();

        const newTodo = {
            title,
            text,
            isCompleted: false
        }

        const response = await fetch('http://localhost:1337/todos', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newTodo)
        })

        const data = await response.json()
        console.log(data);
        navigate('/todos')
    } 

    return (
        <div>
            <h1>CreateTodo Page</h1>

            <hr />

            <div className={styles.formWrapper}>
                <form onSubmit={createTodo}>
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

                    <button type='submit'>Add Todo</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTodo;
