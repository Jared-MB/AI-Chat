import { usePrompt } from "@/store/prompt.store";
import { memo } from "react";
import { Textarea } from "./ui/textarea";

export const PromptInput = memo(() => {
	const { setPrompt, prompt } = usePrompt();

	return (
		<Textarea
			placeholder="Ask something..."
			name="prompt"
			onChange={(e) => setPrompt(e.target.value)}
			value={prompt}
		/>
	);
});
