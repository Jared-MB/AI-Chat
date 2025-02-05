import { create } from "zustand";

interface StreamStore {
	isLoading: boolean;
	isStreaming: boolean;
	streamingContent: string;
	setIsLoading: (isLoading: boolean) => void;
	setIsStreaming: (isStreaming: boolean) => void;
	setStreamingContent: (streamingContent: string) => void;
}

export const useStream = create<StreamStore>()((set) => ({
	isLoading: false,
	isStreaming: false,
	streamingContent: "",
	setIsLoading: (isLoading: boolean) =>
		set((state) => ({
			isLoading,
		})),
	setIsStreaming: (isStreaming: boolean) =>
		set((state) => ({
			isStreaming,
		})),
	setStreamingContent: (streamingContent: string) =>
		set((state) => ({
			streamingContent,
		})),
}));
