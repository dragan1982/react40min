export function TodoItem({id, completed, title, key, toggleTodo, deleteTodo}) {
    return (
        // each list element (todo) at its top level must have key property to be identified with (e.g. for update)
        <li key={key}>
            <label>
                <input type="checkbox" checked={completed} onChange={theEvent => toggleTodo(id, theEvent.target.checked)} />
                {title}
            </label>
            {/* we need to pass arrow inside event handler function either with event object as a param (e)=> or empty if event data is not needed ()=> */}
            <button className="btn btn-danger" onClick={() => deleteTodo(id)}>Delete</button>
        </li>
    )
}