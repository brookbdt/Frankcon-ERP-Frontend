import React, { useState } from 'react';

import AddIcon from "@mui/icons-material/Add";

import { Box, Typography, TextField, Button } from '@mui/material';

const AddTaskButton = ({ onAdd }) => {
    const [showTextField, setShowTextField] = useState(false);
    const [text, setText] = useState('');

    const handleButtonClick = () => {
        setShowTextField(true);
    };

    const handleTextFieldChange = (event) => {
        setText(event.target.value);
    };
    console.log({ showTextField })
    const handleTextFieldKeyDown = (event) => {
        if (event.key === 'Enter') {
            onAdd(text);
            setText('');
            setShowTextField(false);
        }
    };

    return (
        <>
            {(!showTextField) ? (
                <div>
                    <TextField
                        value={text}
                        onChange={handleTextFieldChange}
                        placeholder='add task to project'
                        onKeyDown={handleTextFieldKeyDown}
                        fullWidth
                        autoFocus
                    />
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default AddTaskButton;