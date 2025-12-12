import { useState } from "react";

export function TodoForm(parentProps) {

    const [ newItem, setNewItem ] = useState("")


  // ========== SUBMIT FORM FUNCTION (ADD BUTTON) ==========
  
    function handleSubmit(theSubmitEvent) {

        theSubmitEvent.preventDefault(); // prevent page from refreshin by default on form submit, instead just refresh the dom

        if(newItem === "") { return; } // we want todo to be something

        parentProps.addTodo(newItem); // get the addTodo function from the parent component

        setNewItem("") // clear (reset) input field to empty after adding new todo item
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="new-item-form">
                <div className="form-row">
                    <label htmlFor="item">New Item</label>

                    {/* "newItem" value is whatever is currently set in the state, and we assign the input field value to it
                if you want to call or handle something on html/dom element change inside jsx 
                you use "on..." react event listeners (different from js liseners) on that element 
                event listeners provide an "event object" which you pass into your handler function 
                for example to set new value from dom element on which event occurred into the state variable 
                */}

                    <input
                        value={newItem} // input field value is binded to the react state variable value
                        // whenever input field value changes, assign that new value to the "newItem" state variable using setNewItem() function, 
                        // then rerender component to see the new value in input field (because of the value={newItem})
                        onChange={theEvent => setNewItem(theEvent.target.value)}
                        type="text"
                        id="item"
                    />

                </div>
                <button className="btn">Add</button>
            </form>
        </>
    )
}