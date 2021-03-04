import React, { useState } from "react";

function Todo({
    id = "1", 
    task = "default todo",
    update,
    remove
}) {

    const [updateTask, setUpdateTask] = useState(task);
    const [isUpdating, setIsUpdating] = useState(false);

    // Handle update
    const toggleUpdate = () => {
        setIsUpdating(update => !update);
    };
    
    const handleUpdate = e => {
        e.preventDefault();
        update(id, updateTask);
        setIsUpdating(false);
    };

    // Handle change
    const handleChange = e => {
        setUpdateTask(e.target.value)
    }

    //Handle remove
    const handleRemove = () => remove(id);

    let todoView = (
    <div>
        <li>{task}</li>
        <button onClick={toggleUpdate}>Update</button>
        <button onClick={handleRemove}>X</button>
    </div>
    );

    if(isUpdating) {
        todoView = (<div>
            <form onSubmit={handleUpdate}>
                <input type="text" value={updateTask} onChange={handleChange} />
                <button>Update</button>
            </form>
        </div>
        );
    }

    return todoView;
}


export default Todo;