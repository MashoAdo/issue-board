import type { TIssue } from "../types";

export default async function fetchAndProcessIssues(): Promise<{
	backlog: TIssue[];
	in_progress: TIssue[];
	done: TIssue[];
}> {
	// Simulate a delay(api call)
	await new Promise((resolve) => setTimeout(resolve, 500));

	const data = await import("../data/issues.json");
	const issues = data.issues;

	const backlog = issues.filter((issue) => issue.status === "backlog");
	const in_progress = issues.filter((issue) => issue.status === "in_progress");
	const done = issues.filter((issue) => issue.status === "done");

	return { backlog, in_progress, done } as { backlog: TIssue[]; in_progress: TIssue[]; done: TIssue[] };
}

export async function updateIssueStatus() {
	//simulate api call to save the issue status to the db
	await new Promise((resolve) => setTimeout(resolve, 500));

	const successRate = Math.random() < 0.5;

	if (!successRate) {
		throw new Error("Failed to update issue status");
	}
}
