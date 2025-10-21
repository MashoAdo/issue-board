import type { TIssue } from "../../types";

interface IssueCardProps {
	issue: TIssue;
	stylesOverride?: React.CSSProperties;
}

function IssueCard({ issue, stylesOverride = {} }: IssueCardProps) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "10px",
				border: "1px solid lightgray",
				borderRadius: "8px",
				padding: "12px 8px",
				backgroundColor: "white",
				...stylesOverride,
			}}
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
