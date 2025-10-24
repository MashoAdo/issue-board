import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TIssue } from "../types";
import { calculatePriorityScore, sortIssuesByPriority } from "./index";

describe("sortIssuesByPriority", () => {
	let mockIssues: TIssue[];

	beforeEach(() => {
		const mockDate = new Date("2024-01-15T10:00:00Z");
		vi.setSystemTime(mockDate);

		mockIssues = [
			{
				id: 1,
				title: "Low severity, old issue",
				dateCreated: "2024-01-01T10:00:00Z",
				tags: ["bug"],
				severity: 1,
				userDefinedRank: 5,
				status: "backlog",
				assignee: { id: 1, name: "John Doe" },
			},
			{
				id: 2,
				title: "High severity, recent issue",
				dateCreated: "2024-01-14T10:00:00Z",
				tags: ["critical"],
				severity: 3,
				userDefinedRank: 1,
				status: "in_progress",
				assignee: { id: 2, name: "Jane Smith" },
			},
			{
				id: 3,
				title: "Medium severity, medium age",
				dateCreated: "2024-01-10T10:00:00Z",
				tags: ["feature"],
				severity: 2,
				userDefinedRank: 3,
				status: "backlog",
				assignee: { id: 1, name: "John Doe" },
			},
			{
				id: 4,
				title: "High severity, very old issue",
				dateCreated: "2023-12-15T10:00:00Z",
				tags: ["urgent"],
				severity: 3,
				userDefinedRank: 10,
				status: "done",
				assignee: { id: 3, name: "Bob Wilson" },
			},
		];
	});

	it("should sort issues by priority score in descending order, highest to lowest priority", () => {
		const sortedIssues = sortIssuesByPriority(mockIssues);

		for (let i = 0; i < sortedIssues.length - 1; i++) {
			const currentScore = calculatePriorityScore(sortedIssues[i]);
			const nextScore = calculatePriorityScore(sortedIssues[i + 1]);
			expect(currentScore).toBeGreaterThan(nextScore);
		}
	});

	it("should prioritize newer issues over older ones if the priority score is the same", () => {
		const issues = [
			{
				...mockIssues[0],
				severity: 1,
				userDefinedRank: 1,
				dateCreated: "2024-01-13T10:00:00Z", // 2 days old
			},
			{
				...mockIssues[1],
				severity: 1,
				userDefinedRank: 1,
				dateCreated: "2024-01-14T10:00:00Z", // 1 day old
			},
		];

		const sorted = sortIssuesByPriority(issues);

		const issue1 = sorted[0];
		const issue2 = sorted[1];

		// The first issue should be newer (higher timestamp) than the second issue
		expect(new Date(issue1.dateCreated).getTime()).toBeGreaterThan(new Date(issue2.dateCreated).getTime());
	});
});
