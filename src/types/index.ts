export type IssueStatus = "backlog" | "in_progress" | "done";

export type TIssue = {
	id: number;
	title: string;
	dateCreated: string;
	tags: string[];
	severity: number;
	userDefinedRank: number;
	status: IssueStatus;
};
