import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Modal from "./components/Modal";
import Toaster from "./components/Toaster";
import { adminPermissions, contributorPermissions } from "./constants/currentUser.ts";
import IssueBoardPage from "./features/issues/pages";
import ViewIssue from "./features/issues/pages/ViewIssue";
import useGlobalStore from "./store/store";
import type { TAuthUser } from "./types/index.ts";

function App() {
	const setAuthUser = useGlobalStore((state) => state.setAuthUser);
	const isDarkMode = useGlobalStore((state) => state.isDarkMode);

	useEffect(() => {
		const fetchAuthUser = async () => {
			const user = await import("./constants/currentUser.ts").then((module) => module.default);

			const userPermissions = user.role === "admin" ? adminPermissions : contributorPermissions;

			setAuthUser({ ...user, permissions: userPermissions } as TAuthUser);
		};
		fetchAuthUser();
	}, []);

	// Apply dark mode theme to document
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
	}, [isDarkMode]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate to="/board" replace />} />
				<Route index path="/board" element={<IssueBoardPage />} />
				<Route path="/issues/:id" element={<ViewIssue />} />
				<Route path="/*" element={<>Page Not Found, 404.</>} />
			</Routes>
			<Toaster />
			<Modal />
		</>
	);
}

export default App;
