import "./App.css";

function App() {
	return (
		<div
			style={{
				width: "100",
				backgroundColor: "#FAFBFA",
				padding: "12px",
				display: "flex",
				flexDirection: "row",
			}}
		>
			<div
				style={{
					height: "100vh",
					width: "20%",
					borderRadius: "8px",
					padding: "16px 16px 16px 0px",
				}}
			>
				sidebar
			</div>
			<div
				style={{
					backgroundColor: "#ffffff",
					width: "80%",
					border: "1px solid #e5e6e8",
					borderRadius: "8px",
					padding: "16px",
				}}
			>
				<h1>Tasks</h1>
			</div>
		</div>
	);
}

export default App;
