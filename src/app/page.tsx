import { ChatContainer } from "@/components/chat-container";
import { getLastUsedModel, getModels } from "@/services/getModels";
import { Github } from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const { models } = await getModels();
	const { models: lastModel } = await getLastUsedModel();

	return (
		<div className="font-[family-name:var(--font-geist-sans)] h-full">
			<main>
				<ChatContainer models={models} lastModel={lastModel} />
			</main>
			<Link
				href="https://github.com/Jared-MB/AI-Chat"
				target="_blank"
				className="absolute bottom-4 right-4"
			>
				<Github />
			</Link>
		</div>
	);
}
