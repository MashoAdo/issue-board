import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import useGlobalStore from "../store/store";
import type { IssueStatus } from "../types";

interface UseDragAndDropOptions {
	onError?: (error: Error) => void;
	onSuccess?: (issueId: number, newStatus: string) => void;
}

export function useDragAndDrop({ onError, onSuccess }: UseDragAndDropOptions = {}) {
	const [activeId, setActiveId] = useState<string | null>(null);
	const issues = useGlobalStore((state) => state.issues);
	const setIssues = useGlobalStore((state) => state.setIssues);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
	};

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		// Clear the active ID
		setActiveId(null);

		if (!over || !active) return;

		const activeIssueId = parseInt(active.id as string);
		const newStatus = over.id as IssueStatus;

		// Find the issue in current state
		const allIssues = [...issues.backlog, ...issues.inProgress, ...issues.done];
		const existingIssue = allIssues.find((issue) => issue.id === activeIssueId)!;

		// Don't update if status hasn't changed
		if (existingIssue.status === newStatus) return;

		console.log(`🔄 Moving issue ${existingIssue.status} to ${newStatus}`);

		// Update the issue status
		const updatedIssue = { ...existingIssue, status: newStatus };

		// Remove from current column and add to new column
		const updatedBacklog = issues.backlog.filter((issue) => issue.id !== activeIssueId);
		const updatedInProgress = issues.inProgress.filter((issue) => issue.id !== activeIssueId);
		const updatedDone = issues.done.filter((issue) => issue.id !== activeIssueId);

		// Add to appropriate column
		let newBacklog = updatedBacklog;
		let newInProgress = updatedInProgress;
		let newDone = updatedDone;

		switch (newStatus) {
			case "backlog":
				newBacklog = [...updatedBacklog, updatedIssue];
				break;
			case "in_progress":
				newInProgress = [...updatedInProgress, updatedIssue];
				break;
			case "done":
				newDone = [...updatedDone, updatedIssue];
				break;
		}

		// Update the store immediately (optimistic update)
		setIssues({
			backlog: newBacklog,
			inProgress: newInProgress,
			done: newDone,
		});

		// Make API call to persist the change
		try {
			// await updateIssueStatus(activeIssueId, newStatus);
			console.log(`✅ Successfully moved issue ${activeIssueId} to ${newStatus}`);
			onSuccess?.(activeIssueId, newStatus);
		} catch (error) {
			console.error(`❌ Failed to update issue ${activeIssueId}:`, error);
			onError?.(error as Error);
			// Revert the optimistic update on error
			// In a real app, you'd want to show a toast notification and revert the UI
			// await listIssues(); // Refresh from server
		}
	};

	// Find the active issue being dragged
	const activeIssue = [...issues.backlog, ...issues.inProgress, ...issues.done].find(
		(issue) => issue.id.toString() === activeId
	);

	return {
		activeId,
		activeIssue,
		handleDragStart,
		handleDragEnd,
	};
}
