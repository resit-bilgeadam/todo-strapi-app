import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import TodoLayout from './layouts/TodoLayout';
import Todos from './pages/Todos';
import CreateTodo from './pages/CreateTodo';
import EditTodo from './pages/EditTodo';
import styles from './App.module.scss';

function App() {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/todos'>Todos</Link>
        <Link to ='/create'>+ New Todo</Link>
      </nav>

      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<Home/>} />

          <Route path='/todos' element={<TodoLayout />}>
            <Route path=':id' element={<EditTodo />} />
            <Route index element={<Todos />} />
          </Route>

          <Route path='/create' element={<CreateTodo />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
