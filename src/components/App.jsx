import { useState, useEffect } from "react"
import "./styles.css"
import { TodoForm } from "./todos/TodoForm";
import { TodoList } from "./todos/TodoList";

// ========== THE APP FUNCTION / COMPONENT ==========

// Use export default when exporting only one component.
// If there's multiple components per file to export then use just 'export' and 
// then on the file you want to import them you can do it this way:
// import { Head, Logo, Menu } from './Header';
// We can also export a default and export other functions in the same file.
// import DefaultExport, { Head, Logo, Menu } from './Header';

// react component functions almost always follow a similar structure: 
// hooks at the very top, helper functions and parsing the data in the middle and finally return jsx at the end

export default function App() {

  // React state is managed by the useState() buit-in React "hook" function
  // useState is only way to change state defined variables, used in jsx. 
  // it returns array of two values: first is the name of the variable which we store in the state 
  // second is the name of the function to update value of that vaiable
  // we cannot redefine "const"-declared react state variables directly
  // instead we must call this "setter" function to do it, which also re-renders the entire component


  // ========== STATE CONSTANTS (TODO OBJECTS IN THE REACT STATE AND THEIR INITIAL VALUES) ==========

  // if you simply do "const [todos, setTodos] = useState([]);" this will always initiate todos to an empty array and todos will always be empty when page reloads, 
  // but if you want to work with storage and keep the state of todos as they evolve abd when the page reloads 
  // you then need to pass it a function which will do some logic and return the default value from the local storage

  const [todos, setTodos] = useState(() => {
    const localStorageTodos = localStorage.getItem("TODOS");
    if(localStorageTodos == null){
      return [] // no todos in localstorage so just set them to an empty array
    }
    return JSON.parse(localStorageTodos);
  });


  // ========== LISTENER TO STORE TODOS INTO THE LOCAL STORAGE ============

  // for setting up a listener for storing the data into storage we use react hook called "useEffect()" 
  // useEffect() doesn't return anything, and has a function as first argument and array as a second argument
  // it simply listens to any change to the value defined inside of the array (second argument) and then runs a function defined as a first argument
  // in this case it uses localStorage to save "TODOS" property and json stringified version of the changed state todos as its value

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos)); 
  }, [todos]);
  // NOTE THAT REACT HOOKS MUST BE AT THE TOP OF THE FILE (COMPONENT FUNCTION), THEY CANNOT BE CALLED INSIDE IFS, LOOPS, AFTER RETURNS ETC 

  // ========== "CRUD" METHODS TO MANIPULATE TODO CONSTANTS IN THE STATE ==========

  function addTodo(title) {
    // todos (array) value cannot be modified directly because it is state (const) variable, 
    // therefore we "spread it" (...) i.e. we create new array out of it 
    // then create new item and add it to this new (spread) array and in the end set it back to the state using setTodos()
    // if you want to UPDATE the current state value (spread and update todos inside of the react state directly) because state is immutable directly
    // because each time we directly call setTodos() "todos" are always an empty array, why? state is immutable and you need to create new state object
    // therefore, anytime we want to use or change EXISTING STATE VALUE we must PASS A FUNCTION to the update state using the current value of the state (variable) as parameter

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(), // random id value
          title, // value passed from the input field in the form
          completed: false // default value for the checkbox
        }
      ]
    })
  }

  // console.log(todos);

  function toggleTodo(id, completed) { // 1. use id of the matching todo and the value of the checkbox to togle todo in the state
    setTodos(currentTodos => { // 2. pass the todos from the state into the method to set/update list of todos
      // 8. at the end, after mapping updated todo, return new list of todos and "overwrite" it in the state
      return currentTodos.map(todo => { // 3. call .map on the current state todo list to create new list object to modify
        if (todo.id === id) { // 4. match todo in the list of todos by the passed "id" parameter
          return {
            ...todo, // 5. spread matched todo into a new todo object so that it can be changed
            completed // 6. overwrite or set passed parameter "completed" checkbox value to the spread todo
          }
        }
        return todo // 7. return new todo to be updated into the list of existing todos on the state
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    })
  }

  // ========== APP (ORCHESTRATOR) COMPONENT JSX code ==========

  return (

    // returning multiple html elements from a component requires 
    // wrapping them into "fragment" (empty html tags <>)
    <>

      {/* TodoForm gets the addTodo() method which is used by the form to add new todo(s) into the state */}
      <TodoForm addTodo={addTodo} />

      <h1 className="header">Todo List</h1>

      {/* TodoList component gets list of the todos and togle and delete methods which are used to update the todos in the state */}
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

    </>
  )
}