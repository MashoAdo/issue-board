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

function getDifferenceInDays(newerDate: Date, olderDate: Date) {
	const diffInMs = Math.abs(newerDate.getTime() - olderDate.getTime());

	const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

	return diffInDays;
}

export function calculatePriorityScore(issue: TIssue) {
	const severity = issue.severity;
	const daySinceCreation = getDifferenceInDays(new Date(), new Date(issue.dateCreated));
	const userDefinedRank = issue.userDefinedRank;

	const score = severity * 10 + daySinceCreation * -1 + userDefinedRank;

	return score;
}

export function sortIssuesByPriority(issues: TIssue[]): TIssue[] {
	return [...issues].sort((a, b) => {
		const scoreA = calculatePriorityScore(a);
		const scoreB = calculatePriorityScore(b);

		if (scoreA === scoreB) {
			return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
		}

		return scoreB - scoreA;
	});
}

export function formatDate(dateString: string) {
	return new Date(dateString).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export function getSeverityColor(severity: number) {
	switch (severity) {
		case 1:
			return "gray";
		case 2:
			return "orange";
		case 3:
			return "red";
	}
}

export function getStatusColor(status: string) {
	switch (status) {
		case "backlog":
			return "#607D8B";
		case "in_progress":
			return "blue";
		case "done":
			return "green";
	}
}
