import type { TIssue } from "../types";

export function filterIssues(issues: TIssue[], searchTerm: string) {
	return issues.filter(
		(issue) =>
			issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			issue.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
	);
}
