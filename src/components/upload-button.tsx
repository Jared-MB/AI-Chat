"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useStream } from "@/store/stream.store";
import { useMessages } from "@/store/messages.store";
import { usePrompt } from "@/store/prompt.store";

export const UploadButton = ({
	chatRef,
}: { chatRef: React.RefObject<HTMLDivElement | null> }) => {
	const { model, prompt, setPrompt } = usePrompt();

	const { addMessage, messages } = useMessages();
	const {
		setIsLoading,
		setIsStreaming,
		setStreamingContent,
		isLoading,
		isStreaming,
	} = useStream();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true);

		const response = await fetch("/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ prompt, model, messages }),
		});

		// Ensure response is streamed
		if (!response.body) {
			console.error("No response body received");
			return;
		}

		setIsLoading(false);
		setIsStreaming(true);

		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let streamedText = "";

		while (true) {
			if (chatRef?.current) {
				chatRef.current.scrollTop = chatRef.current.scrollHeight;
			}
			const { done, value } = await reader.read();
			if (done) break;
			streamedText += decoder.decode(value, { stream: true });
			setStreamingContent(streamedText);
		}

		setIsStreaming(false);
		addMessage({ role: "user", content: prompt });
		addMessage({ role: "assistant", content: streamedText });
		setPrompt("");
	};

	return (
		<Button
			onClick={onSubmit}
			type="submit"
			size="icon"
			disabled={isLoading || isStreaming}
		>
			<ChevronUp />
		</Button>
	);
};
