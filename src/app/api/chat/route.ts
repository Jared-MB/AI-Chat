import type { NextRequest } from "next/server";
import ollama from "ollama";

export async function POST(req: NextRequest) {
	try {
		const { model, prompt, messages } = await req.json();

		const enhancedPrompt = `
            
            If there is some code on the response, follow the following constraints:
            - Response on Javascript unless I ask you another language.
            - Follow the best practices on code formatting and readability.
            - Check if there are any errors or issues in the code and also security checks.

            ${prompt}.
            
        `;

		const message = { role: "user", content: enhancedPrompt };

		const response = await ollama.chat({
			model,
			messages: [...messages, message],
			stream: true,
		});

		const stream = new ReadableStream({
			async start(controller) {
				try {
					for await (const part of response) {
						const text = part.message.content;
						controller.enqueue(new TextEncoder().encode(text));
					}
					controller.close();
				} catch (error) {
					controller.error(error);
				}
			},
		});

		return new Response(stream, {
			headers: { "Content-Type": "text/plain" },
		});
	} catch (error) {
		return new Response("Error processing request", { status: 500 });
	}
}
