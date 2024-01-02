import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head />

			<link rel="icon" href="/VerbiloVoice.svg" />
			<meta name="description" content="VerbiloVoice" />
			<meta name="theme-color" content="#10b981" />
			<meta name="apple-mobile-web-app-status-bar" content="#10b981" />
			<meta name="msapplication-navbutton-color" content="#10b981" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta name="mobile-web-app-capable" content="yes"></meta>

			<title>VerbiloVoice</title>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
