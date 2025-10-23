import { DragOverlay, useDndContext } from "@dnd-kit/core";
import IssueDraggingCard from "../../../components/issueBoard/IssueDraggingCard";
import useGlobalStore from "../../../store/store";
import type { IssueStatus } from "../../../types";

function IssueDragOverlay() {
	const { active } = useDndContext();
	const issues = useGlobalStore((state) => state.issues);

	const activeIssue =
		issues[active?.data.current?.columnStatus as IssueStatus]?.find((issue) => issue.id.toString() === active?.id) ??
		null;

	return <DragOverlay>{activeIssue ? <IssueDraggingCard issue={activeIssue} /> : null}</DragOverlay>;
}

export default IssueDragOverlay;
