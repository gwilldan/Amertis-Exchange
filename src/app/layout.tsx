import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { Inter } from "next/font/google";

import { config } from "@/config";
import Web3ModalProvider from "@/context/wallet-provider";
import "./globals.css";
import { Nav, Footer } from "@/components/reusableComp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "@/components/Wrapper";
import ProvideBal from "@/context/provideBal";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Amertis",
	description: "The Next Generation Aggregator on Monad",
	keywords: ["Amertis Exchange", "Amertis", "Exchange", "Monad", "DeFi", "DEX aggregator", "cryptocurrency", "blockchain", "trading", "Aggregator"],
	publisher: "Amertis Team",
	alternates: {
		canonical: "https://amertis.exchange",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		title: "Amertis",
		description: "The Next Generation Aggregator on Monad",
		type: "website",
		locale: "en_US",
		url: "https://amertis.exchange",
		siteName: "Amertis",
		images: [
			{
				url: "/icons/amertisLogo.jpg",
				host: "https://amertis.exchange",
				hostname: "Amertis",
				width: 1200,
				height: 630,
				alt: "Amertis Logo",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Amertis",
		description: "The Next Generation Aggregator on Monad",
		images: [
			{
				url: "/icons/amertisLogo.jpg",
				host: "https://amertis.exchange",
				hostname: "Amertis",
			},
		],
	},
	icons: {
		icon: "/icons/amertisLogo.jpg",
		host: "https://amertis.exchange",
		hostname: "Amertis",
	},

};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialState = cookieToInitialState(
		config,
		(await headers()).get("cookie")
	);

	return (
		<html lang="en">
			<body className={`${inter.className} bg-background h-dvh`}>
				<Web3ModalProvider initialState={initialState}>
					<ProvideBal>
						<Nav />
						<Wrapper>{children}</Wrapper>
						<Footer />
						<Analytics />
						<ToastContainer
							position="top-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="dark"
						/>
					</ProvideBal>
				</Web3ModalProvider>
			</body>
		</html>
	);
}
