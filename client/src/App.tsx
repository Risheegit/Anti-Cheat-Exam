import { useState } from "react";
import AddQuestion from "./pages/AddQuestion";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ViewQuestions from "./pages/ViewAllQuestions";
import StudentView from "./pages/StudentView";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddQuestion />} />
        <Route path="/view" element={<ViewQuestions />} />
        <Route path="/" element={<StudentView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;