import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function QuizCategories({categories, onCategoryChange}){
    const formatedCategories= categories.map(category => ({
        label: category.name,
        value: category.id
    }));
    const handleChange = (event, value) => {
        onCategoryChange(value);
    };
    return (
        <Autocomplete
            disablePortal
            id="categorySelect"
            options={formatedCategories}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select a category" />}
        />
    );
}
