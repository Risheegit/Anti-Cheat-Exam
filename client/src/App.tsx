import { useState } from "react"
import AddQuestion from "./pages/AddQuestion"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import ViewQuestions from "./pages/ViewAllQuestions"
import StudentView from "./pages/StudentView"
import Scorecard from "./pages/Scorecard"
import Welcome from "./pages/Welcome"

function App() {
	const [count, setCount] = useState(0)

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/score" element={<Scorecard />} />
				<Route path="/add" element={<AddQuestion />} />
				<Route path="/view" element={<ViewQuestions />} />
				<Route path="/questions" element={<StudentView />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
