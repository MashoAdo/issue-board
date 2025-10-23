import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ModalState {
	isOpen: boolean;
	content: React.ReactNode;
	title?: string;
}

export interface ModalStore extends ModalState {
	openModal: (content: React.ReactNode, title?: string) => void;
	closeModal: () => void;
}

const useModalStore = create<ModalStore>()(
	devtools(
		(set) => ({
			isOpen: false,
			content: null,
			title: undefined,

			openModal: (content, title) => {
				set({ isOpen: true, content, title });
			},

			closeModal: () => {
				set({ isOpen: false, content: null, title: undefined });
			},
		}),
		{
			name: "modal-store",
		}
	)
);

export default useModalStore;
