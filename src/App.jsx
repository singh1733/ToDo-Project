import React, { useState, useEffect } from "react";
import { NewTodoForm } from "./NewTodoForm"

import "./styles.css"

export default function App() {
  const [toDos, setTodos] = useState(()=>{
    const localValue =localStorage.getItem("ITEMS")
    if (localValue==null) return []
    return JSON.parse(localValue)
  })
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(toDos))
  }, [toDos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo list</h1>
      <ul className="list">
        {toDos.length === 0 && "No Todos"}
        {toDos.map(todo => {
          return (
            <li key={todo.id}>

              <label>
                <input type="checkbox" checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)} />
                {todo.title}
              </label>
              <button onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger">Delete</button>
            </li>
          )
        })}

      </ul>
    </>
  )
}

