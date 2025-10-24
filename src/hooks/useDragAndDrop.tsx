import { type DragEndEvent } from "@dnd-kit/core";
import { updateIssueStatus } from "../api";
import UndoButton from "../components/UndoButton";
import { authUserCan, PERMISSIONS } from "../helpers/permissions";
import useGlobalStore from "../store/store";
import type { IssueStatus, TIssue } from "../types";
import { useToaster } from "./useToaster";

export function useDragAndDrop() {
	const issues = useGlobalStore((state) => state.issues);
	const setIssues = useGlobalStore((state) => state.setIssues);
	const { toastSuccess, toastError, hide } = useToaster();

	const handleDragStart = () => {};

	const handleDragEnd = async (event: DragEndEvent) => {
		if (!authUserCan(PERMISSIONS.MOVE_ISSUE)) return;

		const { active, over } = event;

		if (!over || !active) return;

		const activeColumnStatus = active.data.current?.columnStatus as IssueStatus;
		const activeIssueId = parseInt(active.id as string);
		const droppedColumnStatus = over.id as IssueStatus;

		if (activeColumnStatus === droppedColumnStatus) return;

		// Find the issue being dragged & update status
		const activeColIssues = issues[activeColumnStatus];
		const activeIssue = activeColIssues.find((issue) => issue.id === activeIssueId)!;

		// Update the store immediately (optimistic update)
		const updatedActiveIssue = { ...activeIssue, status: droppedColumnStatus };
		const newActiveColIssues = activeColIssues.filter((issue) => issue.id !== activeIssueId);

		const droppedColumnIssues = issues[droppedColumnStatus];
		const newDroppedColIssues = [...droppedColumnIssues, updatedActiveIssue];

		setIssues({
			[activeColumnStatus]: newActiveColIssues,
			[droppedColumnStatus]: newDroppedColIssues,
		} as Record<IssueStatus, TIssue[]>);

		try {
			// dummy api call to update the issue status ,ideally we would pass the new payload to the api call
			await updateIssueStatus();

			// Show success toaster with undo button
			toastSuccess(
				`${updatedActiveIssue.title} moved to ${updatedActiveIssue.status.split("_").join(" ")}`,
				undefined,
				{
					children: (
						<UndoButton
							onUndo={() => {
								setIssues({
									[activeColumnStatus]: activeColIssues,
									[droppedColumnStatus]: droppedColumnIssues,
								} as Record<IssueStatus, TIssue[]>);

								hide();
							}}
						/>
					),
				}
			);
		} catch (error) {
			toastError("Move Failed", `Failed to move issue #${activeIssueId}`);

			// Revert the optimistic update on error
			setIssues({
				[activeColumnStatus]: activeColIssues,
				[droppedColumnStatus]: droppedColumnIssues,
			} as Record<IssueStatus, TIssue[]>);
		}
	};

	return {
		handleDragStart,
		handleDragEnd,
	};
}
