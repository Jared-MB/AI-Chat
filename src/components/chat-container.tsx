"use client";

import { Messages } from "./messages";
import { Chat } from "./chat";
import type { ModelResponse } from "ollama";
import { useRef } from "react";

export function ChatContainer({
	models,
	lastModel,
}: { models: ModelResponse[]; lastModel: ModelResponse[] }) {
	const ref = useRef(null);

	return (
		<div className="max-w-2xl w-full flex flex-col justify-center gap-4 h-full mx-auto [scroll-behavior:smooth] relative">
			<Messages ref={ref} />
			<Chat models={models} lastModel={lastModel} chatRef={ref} />
		</div>
	);
}
