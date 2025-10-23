import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { IssueStatus, TIssue } from "../types";

export type IssueStore = {
	isLoading: boolean;
	setLoading: (isLoading: boolean) => void;

	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;

	filters: {
		assigneeId: number | undefined;
		severity: number | undefined;
	};
	updateFilters: (filters: Partial<IssueStore["filters"]>) => void;

	isViewIssueModalOpen: boolean;
	toggleViewIssueModal: () => void;

	issues: Record<IssueStatus, TIssue[]>;
	setIssues: (issues: Record<IssueStatus, TIssue[]>) => void;

	recentViewedIssues: TIssue[];
	updateRecentViewedIssues: (issue: TIssue) => void;

	// Polling state
	isPolling: boolean;
	lastSyncTime: string | null;
	startPolling: () => void;
	stopPolling: () => void;
};

const useGlobalStore = create<IssueStore>()(
	devtools(
		persist(
			(set, get) => ({
				// search
				searchTerm: "",
				setSearchTerm: (searchTerm: string) => {
					set(() => ({ searchTerm }));
				},

				// filters
				filters: {
					assigneeId: undefined,
					severity: undefined,
				},
				updateFilters: (filters) => {
					set((state) => ({ filters: { ...state.filters, ...filters } }));
				},

				//loading state
				isLoading: false,
				setLoading: (isLoading) => {
					set(() => ({ isLoading }));
				},

				// view issue modal
				isViewIssueModalOpen: false,
				toggleViewIssueModal: () => {
					set((state) => ({ isViewIssueModalOpen: !state.isViewIssueModalOpen }));
				},

				// issues
				issues: {
					backlog: [],
					in_progress: [],
					done: [],
				},

				setIssues: (issues: { backlog?: TIssue[]; in_progress: TIssue[]; done: TIssue[] }) => {
					set((state) => ({ issues: { ...state.issues, ...issues } as Record<IssueStatus, TIssue[]> }));
				},

				recentViewedIssues: [],
				updateRecentViewedIssues: (issue: TIssue) => {
					set((state) => {
						const currentRecent = state.recentViewedIssues;

						console.log("currentRecent", currentRecent);

						const filteredRecent = currentRecent.filter((existingIssue) => existingIssue.id !== issue.id);
						const newRecentViewedIssues = [...filteredRecent, issue];
						const limitedRecent = newRecentViewedIssues.slice(-5);
						return { recentViewedIssues: limitedRecent };
					});
				},

				// Polling state
				isPolling: false,
				lastSyncTime: null,
				startPolling: () => {
					set(() => ({ isPolling: true }));
				},
				stopPolling: () => {
					set(() => ({ isPolling: false }));
				},
			}),
			{
				name: "issue-board",
				storage: createJSONStorage(() => localStorage),
				partialize: (state) => {
					return {
						recentViewedIssues: state.recentViewedIssues, //only persist recent viewed issues to local storage
					};
				},
			}
		),
		{
			name: "global-store",
		}
	)
);

export default useGlobalStore;
