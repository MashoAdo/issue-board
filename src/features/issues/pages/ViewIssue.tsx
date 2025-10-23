import { useNavigate, useParams } from "react-router-dom";
import Tags from "../../../components/issueBoard/Tags";
import { SEVERITY_LEVELS } from "../../../constants";
import { formatDate, getSeverityColor } from "../../../helpers";
import useGlobalStore from "../../../store/store";

function ViewIssue() {
	const { id } = useParams();
	const issues = useGlobalStore((state) => state.issues);

	const allIssues = [...issues.backlog, ...issues.in_progress, ...issues.done];
	const issue = allIssues.find((issue) => issue.id.toString() === id);

	if (!issue) {
		return (
			<div style={{ padding: "40px", textAlign: "center" }}>
				<h2>Issue not found</h2>
				<BackButton url="/board" label="Back to Board" />
			</div>
		);
	}

	return (
		<div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
			<div style={{ marginBottom: "30px" }}>
				<BackButton url="/board" label="← Back to Board" />

				<h1 style={{ margin: "0 0 8px 0", fontSize: "24px", color: "#1f2937" }}>{issue.title}</h1>

				<div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "14px", color: "#6b7280" }}>
					<span>#{issue.id}</span>
					<span>•</span>
					<span>{issue.assignee.name}</span>
					<span>•</span>
					<span>{formatDate(issue.dateCreated)}</span>
				</div>
			</div>

			<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
				<div>
					<div style={{ marginBottom: "30px" }}>
						<h3 style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#1f2937" }}>Description</h3>
						<div
							style={{
								backgroundColor: "#f9fafb",
								padding: "16px",
								borderRadius: "6px",
								border: "1px solid #e5e7eb",
							}}
						>
							<p style={{ margin: 0, color: "#374151" }}></p>
						</div>
					</div>

					{issue.tags.length > 0 && (
						<div style={{ marginBottom: "30px" }}>
							<h3 style={{ margin: "0 0 12px 0", fontSize: "18px", color: "#1f2937" }}>Tags</h3>
							<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
								{issue.tags.map((tag, index) => (
									<Tags key={index} tag={tag} />
								))}
							</div>
						</div>
					)}
				</div>

				<div>
					<div
						style={{
							backgroundColor: "#f9fafb",
							padding: "20px",
							borderRadius: "8px",
							border: "1px solid #e5e7eb",
						}}
					>
						<h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1f2937" }}>Details</h3>

						<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
							<div>
								<label style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>Status</label>
								<div style={{ marginTop: "4px" }}>
									<span
										style={{
											backgroundColor: getSeverityColor(issue.severity),
											color: "white",
											padding: "4px 8px",
											borderRadius: "4px",
											fontSize: "12px",
											fontWeight: "500",
										}}
									>
										{issue.status.replace("_", " ").toUpperCase()}
									</span>
								</div>
							</div>

							<DisplayValue
								label="Severity"
								value={SEVERITY_LEVELS.find((level) => level.value === issue.severity)?.label || ""}
							/>

							<DisplayValue label="Assignee" value={issue.assignee.name} />

							<DisplayValue label="Created" value={formatDate(issue.dateCreated)} />

							<DisplayValue label="User Rank" value={`${issue.userDefinedRank}/10`} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ViewIssue;

function DisplayValue({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<label style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>{label}</label>
			<div style={{ marginTop: "4px", fontSize: "14px", color: "#374151" }}>{value}</div>
		</div>
	);
}

function BackButton({ url, label }: { url: string; label: string }) {
	const navigate = useNavigate();

	return (
		<button
			className="tasks-button tasks-button--secondary"
			onClick={() => navigate(url)}
			style={{
				marginBottom: "20px",
			}}
		>
			{label}
		</button>
	);
}

function MarkAsResolvedAction() {
	return (
		<div>
			<svg width="40" height="40" viewBox="0 0 1.2 1.2" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#a)" fill="#000">
					<path d="M.88.348a.05.05 0 0 0-.07-.07l-.532.53L.086.616a.05.05 0 0 0-.07.07l.228.228a.05.05 0 0 0 .07 0zm.3 0a.05.05 0 0 0-.07-.07L.544.844a.05.05 0 0 0 .07.07z" />
				</g>
				<defs>
					<clipPath id="a">
						<path fill="#fff" d="M0 0h1.2v1.2H0z" />
					</clipPath>
				</defs>
			</svg>
		</div>
	);
}
