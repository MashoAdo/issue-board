import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewIssue from "./features/issue/ViewIssue";
import Tasks from "./features/tasks/Tasks";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/board" replace />} />
			<Route index path="/board" element={<Tasks />} />
			<Route path="/issue:id" element={<ViewIssue />} />
			<Route path="/*" element={<>Page Not Found, 404.</>} />
		</Routes>
	);
}

export default App;
