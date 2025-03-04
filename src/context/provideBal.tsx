"use client";
import { useEffect, useRef, useState } from "react";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { TokenBalances } from "@/lib/interface";
import { createContext } from "react";
import { TokenList } from "@/lib/TokenList";
import { config } from "@/config";
import { erc20Abi } from "viem";

export const BalProvider = createContext<null | object>(null);

const ProvideBal = ({ children }: { children: React.ReactNode }) => {
	const { address } = useAccount();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const [tokenBalances, setTokenBalances] = useState<TokenBalances[] | []>([]);
	const [tokenList, setTokenList] = useState();

	const tokens = TokenList[config.chains[0].id];

	const calls = tokens.map((token) => ({
		address: token.ca as `0x${string}`,
		abi: erc20Abi,
		functionName: "balanceOf",
		args: [address],
	}));

	const { data: tokenBals, refetch: refetchAll } = useReadContracts({
		config: config,
		contracts: calls,
		query: {
			staleTime: 5000,
			refetchInterval: 5000,
			enabled: !!address,
		},
	});

	const { data: monBal, refetch: refetchMonBal } = useBalance({
		config: config,
		address: address as `0x${string}`,
		query: {
			staleTime: 5000,
			refetchInterval: 5000,
			enabled: !!address,
		},
	});

	useEffect(() => {
		setTokenBalances(
			tokens
				.map((token, index) => ({
					...token,
					balance:
						token.ticker.toUpperCase() === "MON"
							? (monBal?.value as bigint)
							: (tokenBals?.[index]?.result as bigint),
				}))
				.sort((a, b) => Number(b.balance) - Number(a.balance))
		);
	}, [monBal, tokenBals]);

	useEffect(() => {
		if (address) {
			refetchAll();
			refetchMonBal();
		}
	}, [address]);

	const refetch = () => {
		console.log("refetch...");
	};

	return (
		<BalProvider.Provider value={{ tokenBalances, refetch }}>
			{children}
		</BalProvider.Provider>
	);
};

export default ProvideBal;
