
import NavBar from "./components/navbar";
import QuizMarker from "./components/quizMarker";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QuizResults from "./components/quizResults";

function App() {
  return (
    <>
        <NavBar/>
        <QuizMarker/>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<QuizMarker/>} />
                <Route path="/results" element={<QuizResults />} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
