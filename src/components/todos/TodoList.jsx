import { TodoItem } from "./TodoItem"

// destructuring todos from the parent props via { todos } is same as passing just "props" and then doing props.todos or props.toggleTodos everywhere
export function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">

            {todos.length === 0 && "No Todos"}

            {/* javascript .map() function is used to transform (map) todos into jsx html list to display */}

            {/* {todos.map(todo => {
                return <TodoItem 
                    id={todo.id} 
                    completed={todo.completed} 
                    title={todo.title} 
                    key={todo.key} 
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}/>
            })} */}


            {/* below is the same done simpler with the destructuring */}

            {todos.map(todo => {
                // {...todo} spreads the todo into its properties: id, title, completed and sends it down into the TodoItem component where it is used individually
                // key is the new prop that we create from the todo.id value and pass down into the TodoItem to be used in a <li> element as a key of that list element
                return <TodoItem
                    {...todo}
                    key={todo.id}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo} />
            })}
        </ul>

    )
}