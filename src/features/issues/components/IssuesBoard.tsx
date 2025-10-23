import { DndContext } from "@dnd-kit/core";
import IssueColumn from "../../../components/issueBoard/IssueColumn";
import { filterIssuesByAssignee, filterIssuesBySearchTerm, filterIssuesBySeverity } from "../../../helpers";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop";
import useGlobalStore from "../../../store/store";
import IssueDragOverlay from "./IssueDragOverlay";

function IssuesBoard() {
	// Drag and drop management and status update
	const { handleDragStart, handleDragEnd } = useDragAndDrop();

	const loading = useGlobalStore((state) => state.isLoading);
	const searchTerm = useGlobalStore((state) => state.searchTerm);

	const inProgress = useGlobalStore((state) => state.issues.in_progress);
	const backlog = useGlobalStore((state) => state.issues.backlog);
	const done = useGlobalStore((state) => state.issues.done);

	const filters = useGlobalStore((state) => state.filters);

	const filteredBacklog = filterIssuesBySearchTerm(
		filterIssuesByAssignee(filterIssuesBySeverity(backlog, filters.severity), filters.assigneeId),
		searchTerm
	);
	const filteredInProgress = filterIssuesBySearchTerm(
		filterIssuesByAssignee(filterIssuesBySeverity(inProgress, filters.severity), filters.assigneeId),
		searchTerm
	);
	const filteredDone = filterIssuesBySearchTerm(
		filterIssuesByAssignee(filterIssuesBySeverity(done, filters.severity), filters.assigneeId),
		searchTerm
	);

	return (
		<div className="tasks-columns">
			<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<IssueColumn loading={loading} title="Backlog" tasks={filteredBacklog} columnStatus="backlog" />
				<IssueColumn loading={loading} title="In Progress" tasks={filteredInProgress} columnStatus="in_progress" />
				<IssueColumn loading={loading} title="Done" tasks={filteredDone} columnStatus="done" />

				<IssueDragOverlay />
			</DndContext>
		</div>
	);
}

export default IssuesBoard;
