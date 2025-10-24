import DarkModeToggle from "../../../components/DarkModeToggle";

interface IssuesPageHeaderProps {
	lastSyncTime: string | null;
	isPolling: boolean;
}

function IssuesPageHeader({ lastSyncTime, isPolling }: IssuesPageHeaderProps) {
	return (
		<div className="tasks-header-container">
			<div className="tasks-header">
				<h1 className="tasks-title">Issue Tracker Board</h1>
				<p className="tasks-subtitle">Gain insights into project progress and team performance</p>
			</div>
			<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
				{lastSyncTime && (
					<p className="tasks-sync-info">
						Last synced at: <span className="tasks-sync-time">{new Date(lastSyncTime).toLocaleTimeString()}</span>
						{isPolling && <span className="polling-indicator"> • Auto-refreshing every 10s</span>}
					</p>
				)}
				<DarkModeToggle />
			</div>
		</div>
	);
}

export default IssuesPageHeader;
