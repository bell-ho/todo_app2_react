import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import { useCallback, useReducer, useRef, useState } from 'react';
import ImmerTest from './components/ImmerTest';

function createBulkTodos() {
  const arr = [];
  for (let i = 0; i <= 2500; i++) {
    arr.push({
      id: i,
      text: `할일 ${i}`,
      checked: false,
    });
  }
  return arr;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'insert':
      return todos.concat(action.todo);
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id);
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos);

  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // setTodos((todos) => todos.concat(todo));
    dispatch({ type: 'insert', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    // setTodos((todos) => todos.filter((todo) => todo.id !== id));
    dispatch({ type: 'remove', id });
  }, []);

  const onToggle = useCallback((id) => {
    // setTodos((todos) =>
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
    //   ),
    // );
    dispatch({ type: 'toggle', id });
  }, []);

  return (
    <div>
      <ImmerTest />
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList onToggle={onToggle} onRemove={onRemove} todos={todos} />
      </TodoTemplate>
    </div>
  );
};

export default App;
