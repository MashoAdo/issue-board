import { useCallback } from "react";
import UndoButton from "../components/UndoButton";
import useGlobalStore from "../store/store";
import { useToaster } from "./useToaster";

interface UseUndoOptions {
	issueId: number;
	originalStatus: string;
	newStatus: string;
	issueTitle: string;
}

export function useUndo({ issueId, originalStatus, newStatus, issueTitle }: UseUndoOptions) {
	const { setIssues } = useGlobalStore();
	const { showSuccess, hide } = useToaster();

	const showUndoToaster = useCallback(() => {
		showSuccess(`${issueTitle} moved to ${newStatus.split("_").join(" ")}`, undefined, {
			duration: 0,
			children: (
				<UndoButton
					onUndo={() => {
						// Get current state
						const currentState = useGlobalStore.getState().issues;

						// Find the issue
						const allIssues = [...currentState.backlog, ...currentState.inProgress, ...currentState.done];
						const issue = allIssues.find((i) => i.id === issueId);

						if (!issue) return;

						// Revert the issue status
						const revertedIssue = { ...issue, status: originalStatus as any };

						// Remove from current column
						const updatedBacklog = currentState.backlog.filter((i) => i.id !== issueId);
						const updatedInProgress = currentState.inProgress.filter((i) => i.id !== issueId);
						const updatedDone = currentState.done.filter((i) => i.id !== issueId);

						// Add back to original column
						let finalBacklog = updatedBacklog;
						let finalInProgress = updatedInProgress;
						let finalDone = updatedDone;

						switch (originalStatus) {
							case "backlog":
								finalBacklog = [...updatedBacklog, revertedIssue];
								break;
							case "in_progress":
								finalInProgress = [...updatedInProgress, revertedIssue];
								break;
							case "done":
								finalDone = [...updatedDone, revertedIssue];
								break;
						}

						setIssues({
							backlog: finalBacklog,
							inProgress: finalInProgress,
							done: finalDone,
						});

						hide();
						console.log(`🔄 Undid move: Issue ${issueId} reverted to ${originalStatus}`);
					}}
				/>
			),
		});
	}, [issueId, originalStatus, newStatus, issueTitle, setIssues, showSuccess, hide]);

	return { showUndoToaster };
}
