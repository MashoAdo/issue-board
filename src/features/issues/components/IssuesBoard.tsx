import { DndContext } from "@dnd-kit/core";
import IssueColumn from "../../../components/issueBoard/IssueColumn";
import { filterIssues } from "../../../helpers";
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

	return (
		<div className="tasks-columns">
			<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<IssueColumn
					loading={loading}
					title="Backlog"
					tasks={filterIssues(backlog, searchTerm)}
					columnStatus="backlog"
				/>
				<IssueColumn
					loading={loading}
					title="In Progress"
					tasks={filterIssues(inProgress, searchTerm)}
					columnStatus="in_progress"
				/>
				<IssueColumn loading={loading} title="Done" tasks={filterIssues(done, searchTerm)} columnStatus="done" />

				<IssueDragOverlay />
			</DndContext>
		</div>
	);
}

export default IssuesBoard;
