import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Grid} from '@mui/material';
import Typography from "@mui/material/Typography";

export default function QuizResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const {questions, userAnswers} = location.state;

    // Calcul du score
    let score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct_answer) {
            score += 1;
        }
    });

    // Détermination de la couleur du score
    const scoreColor = score <= 1 ? 'red' : score <= 3 ? 'yellow' : score <= 5 ? 'green' : 'green';

    return (
        <Grid container direction="column" spacing={2} alignItems="center">
            {questions.map((question, index) => (
                <Grid item key={index}>
                    <div>
                        <p>{question.question}</p>
                        <div>
                            {[...question.incorrect_answers, question.correct_answer]
                                .sort(() => 0.5 - Math.random())
                                .map((answer, i) => (
                                    <Button
                                        key={i}
                                        variant="outlined"
                                        style={{
                                            margin: '5px',
                                            backgroundColor: userAnswers[index] === answer
                                                ? (answer === question.correct_answer ? 'lightgreen' : 'red')
                                                : (answer === question.correct_answer ? 'lightgreen' : 'inherit'),
                                        }}
                                    >
                                        {answer}
                                    </Button>
                                ))}
                        </div>
                    </div>
                </Grid>
            ))}

            <Grid item>
                < Typography variant="h6" style={{backgroundColor: scoreColor, margin: 10}}>you scored: {score} out {questions.length}</Typography>
                <Button variant="contained" onClick={() => navigate('/')}>New Quiz</Button>
            </Grid>
        </Grid>
    );
}
