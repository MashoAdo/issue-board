import { useIssueData } from "../../../hooks/useIssueData";
import IssuesPageFilters from "../components/IssuePageFilters";
import IssuesPageHeader from "../components/IssuePageHeader";
import IssuesBoard from "../components/IssuesBoard";
import "../style/Tasks.css";

function IssueBoardPage() {
	// Data management
	const { lastSyncTime, isPolling } = useIssueData();

	return (
		<div className="tasks-container">
			<IssuesPageHeader lastSyncTime={lastSyncTime} isPolling={isPolling} />

			<IssuesPageFilters />

			<IssuesBoard />
		</div>
	);
}

export default IssueBoardPage;
