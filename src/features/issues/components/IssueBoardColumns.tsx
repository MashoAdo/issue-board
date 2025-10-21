import { DndContext, type DragOverEvent } from "@dnd-kit/core";
import type { TIssue } from "../../../types";
import BackLogColumn from "./BackLog";
import DoneColumn from "./Done";
import InProgressColumn from "./InProgress";
import IssueDragOverlay from "./IssueDragOverlay";

interface IssueBoardColumnsProps {
	onDragStart: (event: any) => void;
	onDragEnd: (event: any) => void;
	onDragOver?: (event: DragOverEvent) => void;
	activeIssue: TIssue | null;
}

function IssueBoardColumns({ onDragStart, onDragEnd, onDragOver, activeIssue }: IssueBoardColumnsProps) {
	return (
		<div className="tasks-columns">
			<DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
				<BackLogColumn />
				<InProgressColumn />
				<DoneColumn />

				<IssueDragOverlay activeIssue={activeIssue} />
			</DndContext>
		</div>
	);
}

export default IssueBoardColumns;
