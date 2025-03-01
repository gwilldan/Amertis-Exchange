"use client";
import { useEffect, useRef, useState } from "react";
import { getTokenBalances } from "@/lib/getTokenBalances";
import { useAccount } from "wagmi";
import { TokenBalances } from "@/lib/interface";
import { createContext } from "react";

export const BalProvider = createContext<null | object>(null);

const ProvideBal = ({ children }: { children: React.ReactNode }) => {
	const { address } = useAccount();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const [tokenBalances, setTokenBalances] = useState<TokenBalances[] | []>([]);

	const reqBal = async () => {
		if (!address) return;

		console.log("address...", address);
		const res = await getTokenBalances(address);
		setTokenBalances(res || []);
	};

	useEffect(() => {
		reqBal();
	}, [address]);

	// useEffect(() => {
	// 	if (intervalRef.current) clearInterval(intervalRef.current);
	// 	intervalRef.current = setInterval(() => {
	// 		reqBal();
	// 	}, 1000);

	// 	return () => {
	// 		if (intervalRef.current) clearInterval(intervalRef.current);
	// 	};
	// }, [address]);

	const refetch = () => {
		reqBal();
	};

	return (
		<BalProvider.Provider value={{ tokenBalances, refetch }}>
			{children}
		</BalProvider.Provider>
	);
};

export default ProvideBal;
