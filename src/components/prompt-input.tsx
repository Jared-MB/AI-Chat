import { usePrompt } from "@/store/prompt.store";
import { Textarea } from "./ui/textarea";

export const PromptInput = () => {
	const { setPrompt, prompt } = usePrompt();

	return (
		<Textarea
			placeholder="Ask something..."
			name="prompt"
			onChange={(e) => setPrompt(e.target.value)}
			value={prompt}
		/>
	);
};
