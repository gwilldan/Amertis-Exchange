import type { Metadata } from "next";
import { cookieToInitialState } from "wagmi";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { config } from "@/config";
import Web3ModalProvider from "@/context/wallet-provider";
import "./globals.css";
import { Nav, Footer } from "@/components/reusableComp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wrapper from "@/components/Wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Amertis",
	description: "The Next Generation Aggregator on Monad",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialState = cookieToInitialState(config, headers().get("cookie"));

	return (
		<html lang="en">
			<body className={`${inter.className} bg-background h-dvh`}>
				<Web3ModalProvider initialState={initialState}>
					<Nav />
					<Wrapper>{children}</Wrapper>
					<Footer />
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
				</Web3ModalProvider>
			</body>
		</html>
	);
}
