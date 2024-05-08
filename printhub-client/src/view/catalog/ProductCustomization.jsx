import React, { useState } from 'react';

function ProductCustomization({ onSave }) {
    // State for managing the list of customization options
    const [customizationOptions, setCustomizationOptions] = useState([]);

    // State for managing the form inputs
    const [newOption, setNewOption] = useState({
        type: '',
        name: '',
        label: '',
        choices: [],
        choiceText: ''
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOption((prevOption) => ({
            ...prevOption,
            [name]: value,
        }));
    };

    // Function to add a choice to the choices array for radio or select types
    const addChoice = () => {
        if (newOption.choiceText.trim()) {
            setNewOption((prevOption) => ({
                ...prevOption,
                choices: [...prevOption.choices, newOption.choiceText],
                choiceText: '',
            }));
        }
    };

    // Function to handle adding a new customization option
    const addCustomizationOption = () => {
        const { type, name, label, choices } = newOption;
        if (type && name && label) {
            const newCustomizationOption = {
                type,
                name,
                label,
                choices: type === 'text' ? [] : choices,
            };
            setCustomizationOptions((prevOptions) => [...prevOptions, newCustomizationOption]);
            // Reset the new option state
            setNewOption({
                type: '',
                name: '',
                label: '',
                choices: [],
                choiceText: '',
            });
        }
    };

    // Function to save customization options using the provided onSave prop
    const saveCustomizationOptions = () => {
        onSave(customizationOptions);
    };

    return (
        <div>
            <h2>Customization Manager</h2>

            {/* Form to add a new customization option */}
            <div>
                <label htmlFor="type">Input Type:</label>
                <select
                    id="type"
                    name="type"
                    value={newOption.type}
                    onChange={handleInputChange}
                >
                    <option value="">Select Type</option>
                    <option value="text">Text</option>
                    <option value="select">Select</option>
                    <option value="radio">Radio</option>
                </select>

                <label htmlFor="name">Input Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={newOption.name}
                    onChange={handleInputChange}
                />

                <label htmlFor="label">Input Label:</label>
                <input
                    type="text"
                    id="label"
                    name="label"
                    value={newOption.label}
                    onChange={handleInputChange}
                />

                {newOption.type === 'select' || newOption.type === 'radio' ? (
                    <>
                        <label htmlFor="choiceText">Choice:</label>
                        <input
                            type="text"
                            id="choiceText"
                            name="choiceText"
                            value={newOption.choiceText}
                            onChange={handleInputChange}
                        />
                        <button type="button" onClick={addChoice}>
                            Add Choice
                        </button>

                        {/* Display the list of choices */}
                        <div>
                            <h4>Choices:</h4>
                            <ul>
                                {newOption.choices.map((choice, index) => (
                                    <li key={index}>{choice}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : null}

                <button type="button" onClick={addCustomizationOption}>
                    Add Customization Option
                </button>
            </div>

            {/* Display the list of customization options */}
            <div>
                <h3>Customization Options:</h3>
                <ul>
                    {customizationOptions.map((option, index) => (
                        <li key={index}>
                            {option.label} ({option.type})
                        </li>
                    ))}
                </ul>
            </div>

            <button type="button" onClick={saveCustomizationOptions}>
                Save Customization Options
            </button>
        </div>
    );
}

export default ProductCustomization;
