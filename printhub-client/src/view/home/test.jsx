import { useState } from 'react';

function TodoList() {
  // Declare a state variable named "todos" initialized with an empty array
  const [todos, setTodos] = useState([]);

  // Event handler function to add a new todo
  const addTodo = () => {
    const newTodo = prompt("Enter a new todo:");
    if (newTodo) {
      // Update the todos array by adding the new todo
      setTodos([...todos, newTodo]);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      {/* Render the list of todos */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      {/* Button to add a new todo */}
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}

export default TodoList;
