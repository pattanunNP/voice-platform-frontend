import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Kanit } from "next/font/google";

const kanit = Kanit({
	subsets: ["thai"],
	weight: ["400", "500", "600", "700", "800", "900"],
});
export default function App({ Component, pageProps }: AppProps) {
	return (
		<div className={`${kanit.className}`}>
			<Component {...pageProps} />
		</div>
	);
}
