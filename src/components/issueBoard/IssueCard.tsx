import { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { SEVERITY_LEVELS } from "../../constants";
import { formatDate, getSeverityColor } from "../../helpers";
import useGlobalStore from "../../store/store";
import type { TIssue } from "../../types";
import Tags from "./Tags";

export default function IssueCard({ issue, stylesOverride = {} }: { issue: TIssue; stylesOverride?: CSSProperties }) {
	const navigate = useNavigate();
	const updateRecentViewedIssues = useGlobalStore((state) => state.updateRecentViewedIssues);
	const toggleViewIssueModal = useGlobalStore((state) => state.toggleViewIssueModal);
	const isViewIssueModalOpen = useGlobalStore((state) => state.isViewIssueModalOpen);
	const handleViewIssue = () => {
		updateRecentViewedIssues(issue);

		if (isViewIssueModalOpen) {
			toggleViewIssueModal();
		}

		navigate(`/issues/${issue.id}`);
	};

	return (
		<div
			key={issue.id}
			style={{
				border: "1px solid var(--border-primary)",
				borderRadius: "6px",
				padding: "16px",
				backgroundColor: "var(--card-bg)",
				cursor: "pointer",
				transition: "all 0.2s ease",

				...stylesOverride,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
				e.currentTarget.style.borderColor = "var(--border-secondary)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "var(--card-bg)";
				e.currentTarget.style.borderColor = "var(--border-primary)";
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
				}}
			>
				<h4
					style={{
						margin: 0,
						fontSize: "16px",
						fontWeight: "600",
						color: "var(--text-primary)",
						flex: 1,
					}}
				>
					{issue.title}
				</h4>

				<div
					style={{ textDecoration: "none", cursor: "pointer", color: "var(--accent-primary)" }}
					role="button"
					onClick={handleViewIssue}
				>
					View
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					fontSize: "14px",
					color: "var(--text-tertiary)",
					margin: "6px 0",
				}}
			>
				<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
					<span>#{issue.id}</span>
					<span>•</span>
					<span>{issue.assignee.name}</span>
					<span>•</span>
					<span>Severity: {issue.severity}</span>
				</div>
				<span>{formatDate(issue.dateCreated)}</span>
			</div>

			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				{issue.tags.length > 0 && (
					<div style={{ marginTop: "8px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
						{issue.tags.map((tag, index) => (
							<Tags key={index} tag={tag} />
						))}
					</div>
				)}

				<span
					style={{
						backgroundColor: getSeverityColor(issue.severity),
						color: "white",
						padding: "4px 8px",
						borderRadius: "4px",
						fontSize: "12px",
						fontWeight: "500",
						whiteSpace: "nowrap",
					}}
				>
					{SEVERITY_LEVELS.find((level) => level.value === issue.severity)?.label}
				</span>
			</div>
		</div>
	);
}
