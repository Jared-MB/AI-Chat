import { create } from "zustand";

interface MessagesStore {
	messages: { role: string; content: string }[];
	addMessage: (message: { role: string; content: string }) => void;
}

export const useMessages = create<MessagesStore>()((set) => ({
	messages: [],
	addMessage: (message) =>
		set((state) => ({
			messages: [...state.messages, message],
		})),
}));
