import { useCallback } from "react";
import useToasterStore, { type ToasterState } from "../store/toasterStore";

export function useToaster() {
	const { showToaster, hideToaster, isOpen } = useToasterStore();

	const show = useCallback(
		(options: Omit<ToasterState, "isOpen">) => {
			showToaster(options);
		},
		[showToaster]
	);

	const hide = useCallback(() => {
		hideToaster();
	}, [hideToaster]);

	// Convenience methods
	const toastSuccess = useCallback(
		(title: string, message?: string, options?: Partial<Omit<ToasterState, "title" | "message">>) => {
			show({ type: "success", title, message, ...options });
		},
		[show]
	);

	const toastError = useCallback(
		(title: string, message?: string, options?: Partial<Omit<ToasterState, "title" | "message">>) => {
			show({ type: "error", title, message, ...options });
		},
		[show]
	);

	return {
		show,
		hide,
		toastSuccess,
		toastError,
		isOpen,
	};
}
