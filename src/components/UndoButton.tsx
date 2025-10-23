function UndoButton({ onUndo }: { onUndo: () => void }) {
	return (
		<div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
			<button
				onClick={onUndo}
				style={{
					padding: "8px 16px",
					fontSize: "12px",
					backgroundColor: "#FF4742",
					color: "white",
					border: "none",
					borderRadius: "6px",
					cursor: "pointer",
				}}
			>
				Undo
			</button>
		</div>
	);
}

export default UndoButton;
