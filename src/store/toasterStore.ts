import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { DEFAULT_TOASTER_DURATION_IN_MS } from "../constants";

export type ToasterType = "success" | "error";

export interface ToasterState {
	isOpen: boolean;
	type: ToasterType;
	title: string;
	message?: string;
	children?: React.ReactNode;
	duration?: number;
	onClose?: () => void;
}

export interface ToasterStore extends ToasterState {
	showToaster: (config: Omit<ToasterState, "isOpen">) => void;
	hideToaster: () => void;
}

const useToasterStore = create<ToasterStore>()(
	devtools(
		(set, get) => ({
			// Initial state
			isOpen: false,
			type: "info",
			title: "",
			message: "",
			children: undefined,
			duration: DEFAULT_TOASTER_DURATION_IN_MS,
			onClose: undefined,

			// Actions
			showToaster: (config) => {
				set({
					isOpen: true,
					type: config.type || "info",
					title: config.title || "",
					message: config.message,
					children: config.children,
					duration: config.duration || DEFAULT_TOASTER_DURATION_IN_MS,
					onClose: config.onClose,
				});

				// Auto-hide after duration
				setTimeout(() => {
					get().hideToaster();
				}, config.duration || DEFAULT_TOASTER_DURATION_IN_MS);
			},

			hideToaster: () => {
				const { onClose } = get();
				set({ isOpen: false });
				onClose?.();
			},
		}),
		{
			name: "toaster-store",
		}
	)
);

export default useToasterStore;
