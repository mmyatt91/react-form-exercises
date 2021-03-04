import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function NewTodoForm({ createTask }) {
    const [task, setTask] = useState("");

    const handleChange = (e) => {
        setTask(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask({ task, id: uuidv4() });
        setTask("")
    }

    return (
            <div>
                <form onSubmit={handleSubmit}>
                <label htmlFor="task">Task:</label>
                <input 
                onChange={handleChange}
                type="text"
                name="task"
                value={task}
                id="task"
                />
                <button>Add New Task</button>
                </form>
            </div>
    )
}

export default NewTodoForm

