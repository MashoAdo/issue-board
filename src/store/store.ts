import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import type { IssueStatus, TIssue } from "../types";

export type IssueStore = {
	isLoading: boolean;
	setLoading: (isLoading: boolean) => void;

	searchTerm: string;
	setSearchTerm: (searchTerm: string) => void;

	isViewIssueModalOpen: boolean;
	toggleViewIssueModal: () => void;

	isToasterOpen: boolean;
	toggleToaster: () => void;
	issues: Record<IssueStatus, TIssue[]>;
	setIssues: (issues: Record<IssueStatus, TIssue[]>) => void;

	// Polling state
	isPolling: boolean;
	lastSyncTime: string | null;
	startPolling: () => void;
	stopPolling: () => void;
};

const useGlobalStore = create<IssueStore>()(
	devtools(
		persist(
			(set) => ({
				// search
				searchTerm: "",
				setSearchTerm: (searchTerm: string) => {
					set(() => ({ searchTerm }));
				},

				// state
				isLoading: false,
				setLoading: (isLoading: boolean) => {
					console.log("isLoading", isLoading);
					set(() => ({ isLoading }));
				},

				// view issue modal
				isViewIssueModalOpen: false,
				toggleViewIssueModal: () => {
					set((state) => ({ isViewIssueModalOpen: !state.isViewIssueModalOpen }));
				},

				// toaster
				isToasterOpen: false,
				toggleToaster: () => {
					set((state) => ({ isToasterOpen: !state.isToasterOpen }));
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
			}
		),
		{
			name: "global-store",
		}
	)
);

export default useGlobalStore;
