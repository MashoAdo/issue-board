import { useCallback, useEffect, useRef } from "react";

interface UsePollingOptions {
	isPolling: boolean;
	interval: number;
	callback: () => Promise<void> | void;
}

function usePolling({ isPolling, interval, callback }: UsePollingOptions) {
	const intervalRef = useRef<number | null>(null);
	const callbackRef = useRef(callback);

	// Update callback ref when callback changes
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	// Stable callback that uses the ref
	const stableCallback = useCallback(() => {
		callbackRef.current();
	}, []);

	useEffect(
		function () {
			// Clear existing interval
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}

			// Start polling if enabled
			if (isPolling) {
				// Set up interval
				intervalRef.current = setInterval(stableCallback, interval);
			}

			return () => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
					intervalRef.current = null;
				}
			};
		},
		[isPolling, interval, stableCallback]
	);
}

export default usePolling;
