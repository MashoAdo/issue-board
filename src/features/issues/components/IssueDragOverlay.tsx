import { DragOverlay } from "@dnd-kit/core";
import IssueDraggingCard from "../../../components/issueBoard/IssueDraggingCard";
import type { TIssue } from "../../../types";

interface IssueDragOverlayProps {
	activeIssue: TIssue | null;
}

function IssueDragOverlay({ activeIssue }: IssueDragOverlayProps) {
	return <DragOverlay>{activeIssue ? <IssueDraggingCard issue={activeIssue} /> : null}</DragOverlay>;
}

export default IssueDragOverlay;
