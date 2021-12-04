import styles from './TodoCard.module.scss';

function TodoCard({todo, onDelete, onEdit}) {
    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>{todo.title}</h3>
            <p className={styles.cardText}>{todo.text}</p>

            <div>
                <button onClick={() => onDelete(todo.id)}>Delete</button>
                <button onClick={() => onEdit(todo.id)}>Edit</button>
            </div>
        </div>
    )
}

export default TodoCard;
