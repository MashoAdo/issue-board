import type { TIssue } from "../types";

export function filterIssuesBySearchTerm(issues: TIssue[], searchTerm: string) {
	if (!searchTerm) {
		return issues;
	}

	return issues.filter(
		(issue) =>
			issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			issue.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
	);
}

export function filterIssuesByAssignee(issues: TIssue[], assigneeId: number | undefined) {
	if (!assigneeId) {
		return issues;
	}

	return issues.filter((issue) => issue.assignee.id === assigneeId);
}

export function filterIssuesBySeverity(issues: TIssue[], value: number | undefined) {
	if (!value) {
		return issues;
	}

	return issues.filter((issue) => issue.severity === value);
}

export function calculatePriorityScore(issue: TIssue) {
	const severity = issue.severity;
	const daySinceCreation = new Date(issue.dateCreated).getTime() - new Date().getTime();
	const userDefinedRank = issue.userDefinedRank;

	const score = severity * 10 + daySinceCreation * -1 + userDefinedRank;

	return score;
}

export function sortIssuesByPriority(issues: TIssue[]): TIssue[] {
	return [...issues].sort((a, b) => calculatePriorityScore(a) - calculatePriorityScore(b));
}
