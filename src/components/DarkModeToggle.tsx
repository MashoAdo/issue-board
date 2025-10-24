import useGlobalStore from "../store/store";

function DarkModeToggle() {
	const isDarkMode = useGlobalStore((state) => state.isDarkMode);
	const toggleDarkMode = useGlobalStore((state) => state.toggleDarkMode);

	return (
		<button
			onClick={toggleDarkMode}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "40px",
				height: "40px",
				border: "1px solid var(--border-primary)",
				borderRadius: "8px",
				background: "var(--bg-secondary)",
				color: "var(--text-secondary)",
				cursor: "pointer",
				transition: "all 0.2s ease",
				fontSize: "18px",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = "var(--hover-bg)";
				e.currentTarget.style.borderColor = "var(--border-secondary)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
				e.currentTarget.style.borderColor = "var(--border-primary)";
			}}
			title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
		>
			{isDarkMode ? "☀️" : "🌙"}
		</button>
	);
}

export default DarkModeToggle;
