function UndoButton({ onUndo }: { onUndo: () => void }) {
	return (
		<div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
			<button
				onClick={onUndo}
				style={{
					fontSize: "12px",
					backgroundColor: "#FF4742",
					color: "white",
					border: "none",
					padding: "4px 8px",
					borderRadius: "4px",
					fontWeight: "500",
					whiteSpace: "nowrap",
					cursor: "pointer",
				}}
			>
				Undo
			</button>
		</div>
	);
}

export default UndoButton;
