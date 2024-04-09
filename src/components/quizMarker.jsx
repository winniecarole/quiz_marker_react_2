import React, {useState, useEffect} from 'react'
import QuizCategories from "./quizCategories";
import QuizDifficulty from "./quizDifficulty";
import Grid from '@mui/material/Grid';
import styles from "./style";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';


export default function QuizMarker() {
    const [quizCategories, setQuizCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null)
    const quizDifficulty = ["easy", "medium", "hard"]
    const [questions, setQuestions] = useState([])
    const [userAnswers, setUserAnswers] = useState({});
    const navigate = useNavigate();
    const shuffleAnswers = (correctAnswer, incorrectAnswers) => {
        const allAnswers = [correctAnswer, ...incorrectAnswers];
        return allAnswers.sort(() => Math.random() - 0.5);
    };
    const handleSelectAnswer = (questionIndex, answer) => {
        setUserAnswers(prev => ({...prev, [questionIndex]: answer}));
    };

    const handleSubmit = () => {
        console.log(userAnswers)
        navigate('/results', {state: {questions, userAnswers}});
    };

    const loadCategories = () => {
        fetch('https://opentdb.com/api_category.php').then(
            (res) => {
                return res.json()
            }
        ).then((data) => {
            setQuizCategories(data.trivia_categories)
        })
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleChangeDifficulty = (difficulty) => {
        setSelectedDifficulty(difficulty)
    }

    const loadQuestions = () => {
        if (!selectedCategory && !selectedDifficulty) {
            return; // Sortez de la fonction si aucune catégorie n'est sélectionnée
        }
        const url = `https://opentdb.com/api.php?amount=5&category=${selectedCategory.value}&difficulty=${selectedDifficulty}&type=multiple`;
        fetch(url).then(res => res.json()).then(data => {
            setQuestions(data.results)
        });
    }

    useEffect(() => {
        loadCategories()
    }, []);


    return (
        <>
            <Box sx={{...styles.container, margin: 5}}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>
                        <QuizCategories categories={quizCategories} onCategoryChange={handleCategoryChange}/>
                    </Grid>
                    <Grid item>
                        <QuizDifficulty difficulty={quizDifficulty} onDifficultyChange={handleChangeDifficulty}/>
                    </Grid>
                    <Grid item>
                        <Button id="createBtn" variant="contained" onClick={loadQuestions}>Create</Button>
                    </Grid>
                </Grid>
            </Box>

            <Grid container direction="column" spacing={2} alignItems="center">
            {(selectedCategory && selectedDifficulty) ? (
                    <div>
                            {questions.length > 0 && questions.map((question, index) => (

                                <Grid key={index} item >
                                    <div>
                                        <p>{question.question}</p>
                                        <div>
                                            {shuffleAnswers(question.correct_answer, question.incorrect_answers).map((answer, i) => (
                                                <Button
                                                    key={i}
                                                    variant="outlined"
                                                    onClick={() => handleSelectAnswer(index, answer)}
                                                    style={{
                                                        margin: '0 5px',
                                                        backgroundColor: userAnswers[index] === answer ? 'lightgreen' : undefined,
                                                    }}>
                                                    {answer}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                </Grid>

                            ))}
                            {Object.keys(userAnswers).length === questions.length && questions.length > 0 && (
                                <Button variant="contained" color="primary" style={{marginTop: '20px'}}
                                        onClick={handleSubmit}>
                                    Submit
                                </Button>
                            )}
                        </div>
                    )
                : (<></>)

            }

            </Grid>
        </>

    )
}
