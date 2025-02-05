"use client";

import { useMessages } from "@/store/messages.store";
import { cn } from "@/lib/utils";
import { Message } from "./message";
import { useStream } from "@/store/stream.store";
import { memo } from "react";

export const Messages = memo(({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
	const messages = useMessages((store) => store.messages);
	const { isLoading, isStreaming, streamingContent } = useStream();

	return (
		<div
			className="max-h-[80dvh] overflow-y-auto max-w-full overflow-x-auto flex flex-col gap-4 p-4"
			ref={ref}
		>
			{messages.map((message, index) => (
				<div
					key={index}
					className={cn(
						message.role === "user"
							? "flex justify-end items-center w-fit ml-auto bg-zinc-200 px-4 py-2 rounded-lg rounded-br-none"
							: "",
					)}
				>
					<Message>{message.content}</Message>
				</div>
			))}
			<div>
				{isLoading ? (
					"Loading"
				) : isStreaming ? (
					<Message>{streamingContent}</Message>
				) : (
					""
				)}
			</div>
		</div>
	);
});
