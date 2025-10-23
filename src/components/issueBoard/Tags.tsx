function Tags({ tag }: { tag: string }) {
	return (
		<span
			style={{
				backgroundColor: "#e0e7ff",
				color: "#3730a3",
				padding: "2px 6px",
				borderRadius: "3px",
				fontSize: "12px",
				fontWeight: "500",
			}}
		>
			{tag}
		</span>
	);
}

export default Tags;
