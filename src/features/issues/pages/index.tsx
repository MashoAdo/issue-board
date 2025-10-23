import { useIssueData } from "../../../hooks/useIssueData";
import IssueBoardFilters from "../components/IssuePageFilters";
import IssuesPageFilters from "../components/IssuePageHeader";
import IssuesBoard from "../components/IssuesBoard";
import "../style/Tasks.css";

function IssueBoardPage() {
	// Data management
	const { lastSyncTime, isPolling } = useIssueData();

	return (
		<div className="tasks-container">
			<IssuesPageFilters lastSyncTime={lastSyncTime} isPolling={isPolling} />

			<IssueBoardFilters />

			<IssuesBoard />
		</div>
	);
}

export default IssueBoardPage;
