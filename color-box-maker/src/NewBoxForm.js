import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function NewBoxForm({ createBox }) {
    const INITIAL_STATE = {
        width: '',
        height: '',
        backgroundColor: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBox({ ...formData, id: uuidv4() });
        setFormData(INITIAL_STATE)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="width">Width</label>
                    <input 
                    onChange={handleChange}
                    type="text"
                    name="width"
                    value={formData.width}
                    id="width"
                    />
                </div>
                <div>
                <label htmlFor="height">Height</label>
                    <input 
                    onChange={handleChange}
                    type="text"
                    name="height"
                    value={formData.height}
                    id="height"
                    />
                </div>
                <div>
                <label htmlFor="backgroundColor">Background Color</label>
                    <input 
                    onChange={handleChange}
                    type="text"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    id="backgroundColor"
                    />
                </div>
                <button id="newBoxButton">Add New Box</button>
            </form>
        </div>
    )
}

export default NewBoxForm

