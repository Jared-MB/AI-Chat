import { create } from "zustand";

interface PromptStore {
	prompt: string;
	model: string;
	setPrompt: (prompt: string) => void;
	setModel: (model: string) => void;
}

export const usePrompt = create<PromptStore>()((set) => ({
	prompt: "",
	model: "",
	setModel: (model) =>
		set((state) => ({
			model,
		})),
	setPrompt: (prompt) =>
		set((state) => ({
			prompt,
		})),
}));
