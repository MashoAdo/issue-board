interface InputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClear?: () => void;
	showClearButton?: boolean;
}

function Input({ value, onChange, onClear }: InputProps) {
	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<input
				className="tasks-search"
				type="text"
				name="search"
				id="search"
				placeholder="Search task by title, tags"
				value={value}
				onChange={onChange}
				style={{ paddingRight: value ? "40px" : "12px" }}
			/>
			{value && (
				<button
					type="button"
					onClick={onClear}
					style={{
						position: "absolute",
						right: "8px",
						top: "50%",
						transform: "translateY(-50%)",
						background: "none",
						border: "none",
						cursor: "pointer",
						padding: "4px",
						borderRadius: "4px",
						color: "#6b7280",
						fontSize: "16px",
						lineHeight: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = "#f3f4f6";
						e.currentTarget.style.color = "#374151";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "transparent";
						e.currentTarget.style.color = "#6b7280";
					}}
					title="Clear search"
				>
					×
				</button>
			)}
		</div>
	);
}

export default Input;
