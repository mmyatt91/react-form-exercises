import React from "react";

function Box({
    id,
    handleRemove,
    width = 3,
    height = 4,
    backgroundColor = "black",
}) {
    const remove = () => handleRemove(id);
    return (
        <div>
            <div 
            style = {{
                width: `${width}em`,
                height: `${height}em`,
                backgroundColor
            }}/>
            <button onClick={remove}>X</button>
        </div>
    );
}

export default Box;