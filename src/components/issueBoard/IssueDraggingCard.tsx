import type { TIssue } from "../../types";
import IssueCard from "./IssueCard";

interface IssueDraggingCardProps {
	issue: TIssue;
}

function IssueDraggingCard({ issue }: IssueDraggingCardProps) {
	return (
		<IssueCard
			issue={issue}
			stylesOverride={{
				border: "1px solid #3b82f6",
				backgroundColor: "#f0f9ff",
				cursor: "grabbing",
				boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
				transform: "rotate(3deg)",
				opacity: 0.9,
			}}
		/>
	);
}

export default IssueDraggingCard;
