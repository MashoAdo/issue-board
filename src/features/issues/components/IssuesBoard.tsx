import { DndContext } from "@dnd-kit/core";
import IssueColumn from "../../../components/issueBoard/IssueColumn";
import { useDragAndDrop } from "../../../hooks/useDragAndDrop";
import useGlobalStore from "../../../store/store";
import IssueDragOverlay from "./IssueDragOverlay";

function IssuesBoard() {
	// Drag and drop management and status update
	const { handleDragStart, handleDragEnd } = useDragAndDrop();

	const loading = useGlobalStore((state) => state.isLoading);

	const inProgress = useGlobalStore((state) => state.issues.in_progress);
	const backlog = useGlobalStore((state) => state.issues.backlog);
	const done = useGlobalStore((state) => state.issues.done);

	return (
		<div className="tasks-columns">
			<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				<IssueColumn loading={loading} title="Backlog" tasks={backlog} columnStatus="backlog" />
				<IssueColumn loading={loading} title="In Progress" tasks={inProgress} columnStatus="in_progress" />
				<IssueColumn loading={loading} title="Done" tasks={done} columnStatus="done" />

				<IssueDragOverlay />
			</DndContext>
		</div>
	);
}

export default IssuesBoard;
