import { memo } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Message = memo(({ children }: { children: string }) => {
	return (
		<ReactMarkdown
			className="overflow-x-auto"
			components={{
				code(props) {
					const { children, className, node, ...rest } = props;
					const match = /language-(\w+)/.exec(className || "");
					return match ? (
						// @ts-ignore
						<SyntaxHighlighter
							{...rest}
							PreTag="div"
							language={match[1]}
							style={oneDark}
						>
							{String(children).replace(/\n$/, "")}
						</SyntaxHighlighter>
					) : (
						<code {...rest} className={className}>
							{children}
						</code>
					);
				},
			}}
		>
			{children}
		</ReactMarkdown>
	);
});
