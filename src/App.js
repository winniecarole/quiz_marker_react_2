
import NavBar from "./components/navbar";
import QuizMarker from "./components/quizMarker";
import {HashRouter, Route, Routes} from "react-router-dom";
import QuizResults from "./components/quizResults";

function App() {
  return (
    <>
        <NavBar/>
        <HashRouter>
            <Routes>
                <Route path="/" element={<QuizMarker/>} />
                <Route path="/results" element={<QuizResults />} />
            </Routes>
        </HashRouter>
    </>
  );
}

export default App;
