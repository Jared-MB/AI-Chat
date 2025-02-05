import { Chat } from "@/components/chat";
import { ChatContainer } from "@/components/chat-container";
import { Messages } from "@/components/messages";
import { getLastUsedModel, getModels } from "@/services/getModels";

export default async function Home() {
	const { models } = await getModels();
	const { models: lastModel } = await getLastUsedModel();

	return (
		<div className="font-[family-name:var(--font-geist-sans)] h-full">
			<main>
				<ChatContainer models={models} lastModel={lastModel} />
			</main>
		</div>
	);
}
