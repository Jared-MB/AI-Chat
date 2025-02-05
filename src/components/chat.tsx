"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { memo, useEffect } from "react";
import type { ModelResponse } from "ollama";
import { UploadButton } from "./upload-button";
import { usePrompt } from "@/store/prompt.store";
import { PromptInput } from "./prompt-input";

export const Chat = memo(
	({
		models,
		lastModel,
		chatRef,
	}: {
		models: ModelResponse[];
		lastModel: ModelResponse[];
		chatRef: React.RefObject<HTMLDivElement | null>;
	}) => {
		const { model, setModel } = usePrompt();

		useEffect(() => {
			if (lastModel[0]) {
				setModel(lastModel[0].name);
			}
		}, []);

		return (
			<form className="flex flex-col gap-4 sticky bottom-0">
				<PromptInput />
				<div className="flex items-center justify-between">
					<Select name="model" value={model} onValueChange={setModel}>
						<SelectTrigger className="max-w-[280px]">
							<SelectValue placeholder="Select a model" />
						</SelectTrigger>
						<SelectContent>
							{models.map((model) => (
								<SelectItem key={model.digest} value={model.name}>
									{model.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<UploadButton chatRef={chatRef} />
				</div>
			</form>
		);
	},
);
