import React from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
export default function QuizDifficulty ({difficulty,onDifficultyChange}){
    const handleChange = (event,value) => {
        onDifficultyChange(value);
    };

    return(
            <>
                <Autocomplete
                    disablePortal
                    id="difficultySelect"
                    options={difficulty}
                    onChange={handleChange}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="select difficulty" />}
                />
            </>
        )

}
