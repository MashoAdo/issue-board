import { type DragOverEvent } from "@dnd-kit/core";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop";
import { useIssueData } from "../../../hooks/useIssueData";
import IssueBoardColumns from "../components/IssueBoardColumns";
import IssueBoardFilters from "../components/IssueBoardFilters";
import IssueBoardHeader from "../components/IssueBoardHeader";
import "../style/Tasks.css";

function IssueBoard() {
	// Data management
	const { lastSyncTime, isPolling } = useIssueData();

	// Drag and drop management
	const { activeIssue, handleDragStart, handleDragEnd } = useDragAndDrop({
		onError: (error) => {
			console.error("Drag and drop error:", error);
			// Could show toast notification here
		},
		onSuccess: (issueId, newStatus) => {
			console.log(`Successfully moved issue ${issueId} to ${newStatus}`);
			// Could show success notification here
		},
	});

	const handleDragOver = (event: DragOverEvent) => {
		// Optional: Handle drag over events for visual feedback
		console.log("drag over", event);
	};

	return (
		<div className="tasks-container">
			<IssueBoardHeader lastSyncTime={lastSyncTime} isPolling={isPolling} />

			<IssueBoardFilters />

			<IssueBoardColumns
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragOver={handleDragOver}
				activeIssue={activeIssue ?? null}
			/>
		</div>
	);
}

export default IssueBoard;
