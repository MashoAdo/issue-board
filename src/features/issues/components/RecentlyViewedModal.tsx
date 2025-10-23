import IssueCard from "../../../components/issueBoard/IssueCard";
import useGlobalStore from "../../../store/store";

function RecentlyViewedModal() {
	const recentlyViewed = useGlobalStore((state) => state.recentViewedIssues);

	if (recentlyViewed.length === 0) {
		return (
			<div style={{ textAlign: "center", padding: "40px" }}>
				<h3 style={{ margin: "0 0 8px 0", color: "#374151" }}>No recently viewed issues</h3>
				<p style={{ margin: 0, color: "#6b7280" }}>Start viewing issues to see them here</p>
			</div>
		);
	}

	return (
		<div>
			<div style={{ marginBottom: "20px" }}>
				<p style={{ margin: "0 0 16px 0", color: "#6b7280", fontSize: "14px" }}>Issues you've recently viewed</p>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				{[...recentlyViewed].reverse().map((issue) => (
					<IssueCard key={issue.id} issue={issue} />
				))}
			</div>
		</div>
	);
}

export default RecentlyViewedModal;
