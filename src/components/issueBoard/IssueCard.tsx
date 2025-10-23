import { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { SEVERITY_LEVELS } from "../../constants";
import { formatDate, getSeverityColor } from "../../helpers";
import useGlobalStore from "../../store/store";
import type { TIssue } from "../../types";

export default function IssueCard({
	issue,
	disableViewIssue = false,
	stylesOverride = {},
}: {
	issue: TIssue;
	disableViewIssue?: boolean;
	stylesOverride?: CSSProperties;
}) {
	const navigate = useNavigate();
	const updateRecentViewedIssues = useGlobalStore((state) => state.updateRecentViewedIssues);

	const handleViewIssue = () => {
		updateRecentViewedIssues(issue);
		navigate(`/issues/${issue.id}`);
	};

	return (
		<div
			key={issue.id}
			style={{
				border: "1px solid #e5e7eb",
				borderRadius: "6px",
				padding: "16px",
				backgroundColor: "#fafafa",
				cursor: "pointer",
				transition: "all 0.2s ease",

				...stylesOverride,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = "#f3f4f6";
				e.currentTarget.style.borderColor = "#d1d5db";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = "#fafafa";
				e.currentTarget.style.borderColor = "#e5e7eb";
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
						color: "#1f2937",
						flex: 1,
					}}
				>
					{issue.title}
				</h4>

				{!disableViewIssue && (
					<div
						style={{ textDecoration: "none", cursor: "pointer", color: "#3b82f6" }}
						role="button"
						onClick={handleViewIssue}
					>
						View
					</div>
				)}
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					fontSize: "14px",
					color: "#6b7280",
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
							<span
								key={index}
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
