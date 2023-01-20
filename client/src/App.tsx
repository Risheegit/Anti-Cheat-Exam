import { useState } from "react";
import AddQuestion from "./pages/AddQuestion";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ViewQuestions from "./pages/ViewAllQuestions";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddQuestion />} />
        <Route path="/" element={<ViewQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
