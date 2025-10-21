import { useDraggable } from "@dnd-kit/core";
import type { TIssue } from "../../types";

interface IssueCardProps {
	issue: TIssue;
}

function IssueCard({ issue }: IssueCardProps) {
	const { isDragging, attributes, listeners, setNodeRef } = useDraggable({
		id: issue.id.toString(),
	});

	return (
		<div
			ref={setNodeRef}
			style={{
				opacity: isDragging ? 0.3 : 1,
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				border: isDragging ? "2px dashed #3b82f6" : "1px solid lightgray",
				borderRadius: "8px",
				padding: "12px 8px",
				zIndex: isDragging ? 1 : 1,
				backgroundColor: isDragging ? "#f8fafc" : "white",
				cursor: isDragging ? "grabbing" : "grab",
				boxShadow: isDragging ? "none" : "none",
				transform: isDragging ? "none" : "none",
				transition: "all 0.2s ease",
			}}
			{...attributes}
			{...listeners}
		>
			<p>{issue.title}</p>

			<div style={{ display: "flex", gap: "16px" }}>
				{issue.tags.map((tag, idx) => (
					<div
						key={idx}
						style={{
							border: "1px solid lightgray",
							borderRadius: "6px",
							padding: "2px 4px",
							fontSize: "12px",
						}}
					>
						{tag}
					</div>
				))}
			</div>

			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<p style={{ fontSize: "14px" }}>{issue.dateCreated}</p>
				<p style={{ fontSize: "14px", color: "red" }}>Priority {issue.severity}</p>
			</div>
		</div>
	);
}

export default IssueCard;
