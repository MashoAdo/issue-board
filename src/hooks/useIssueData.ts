import { useEffect } from "react";
import fetchAndProcessIssues from "../api";
import useGlobalStore from "../store/store";
import usePolling from "./usePolling";

export function useIssueData() {
	const setIssues = useGlobalStore((state) => state.setIssues);
	const setLoading = useGlobalStore((state) => state.setLoading);
	const lastSyncTime = useGlobalStore((state) => state.lastSyncTime);
	const isPolling = useGlobalStore((state) => state.isPolling);
	const startPolling = useGlobalStore((state) => state.startPolling);
	const stopPolling = useGlobalStore((state) => state.stopPolling);

	const listIssues = async () => {
		try {
			console.log("🔄 Fetching issues...");
			const { backlog, inProgress, done } = await fetchAndProcessIssues();

			setIssues({ backlog, inProgress, done });

			// Update last sync time
			useGlobalStore.setState({ lastSyncTime: new Date().toISOString() });
		} catch (error) {
			console.error("❌ Failed to fetch issues:", error);
		}
	};

	// Initial fetch and start polling
	useEffect(function initializeDataAndStartPolling() {
		setLoading(true);
		listIssues().finally(() => setLoading(false));
		startPolling();

		return function cleanupPolling() {
			stopPolling();
		};
	}, []);

	async function dummyWebsocketCall() {
		//Ideally this would be a persistent connection like websockets , http long polling or even SSE.
		await new Promise((resolve) => setTimeout(resolve, 1000));

		useGlobalStore.setState({ lastSyncTime: new Date().toISOString() });
	}

	usePolling({
		isPolling,
		interval: 10000,
		callback: dummyWebsocketCall,
	});

	return {
		lastSyncTime,
		isPolling,
		listIssues,
	};
}
