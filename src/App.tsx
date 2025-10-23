import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Toaster from "./components/Toaster";
import IssueBoardPage from "./features/issues/pages";
import ViewIssue from "./features/issues/pages/ViewIssue";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate to="/board" replace />} />
				<Route index path="/board" element={<IssueBoardPage />} />
				<Route path="/issue:id" element={<ViewIssue />} />
				<Route path="/*" element={<>Page Not Found, 404.</>} />
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
