"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import { Token, TokenBalances } from "@/lib/interface";
import { createContext } from "react";
import { TokenList } from "@/lib/TokenList";
import { config } from "@/config";
import { erc20Abi, zeroAddress } from "viem";
import { allTokens } from "@/lib/utils";

export const BalProvider = createContext<null | object>(null);

const ProvideBal = ({ children }: { children: React.ReactNode }) => {
	const { address } = useAccount();
	const [tokenBalances, setTokenBalances] = useState<TokenBalances[] | []>([]);
	const [tokenUpdateCounter, setTokenUpdateCounter] = useState(0);
	const tokens = useMemo(() => allTokens(), [tokenUpdateCounter]);

	const calls = Object.values(tokens).map((token: any) => ({
		address: token.ca as `0x${string}`,
		abi: erc20Abi,
		functionName: "balanceOf",
		args: [address],
	}));

	const { data: tokenBals } = useReadContracts({
		config: config,
		batchSize: 0,
		contracts: calls,
		multicallAddress:
			"0xcA11bde05977b3631167028862bE2a173976CA11" as `0x${string}`,
		query: {
			staleTime: 10_000,
			refetchInterval: 10_000,
			enabled: !!address,
		},
	});

	const { data: monBal } = useBalance({
		config: config,
		address: address as `0x${string}`,
		query: {
			staleTime: 10_000,
			refetchInterval: 10_000,
			enabled: !!address,
		},
	});

	useEffect(() => {
		setTokenBalances(
			Object.values(tokens)
				.map((token: any, index: number) => ({
					...token,
					balance:
						token?.ca?.toLowerCase() === zeroAddress.toLowerCase()
							? (monBal?.value as bigint)
							: (tokenBals?.[index]?.result as bigint),
				}))
				.sort((a, b) => Number(b.balance) - Number(a.balance))
		);
	}, [monBal, tokenBals, tokens]);

	const refreshTokens = () => {
		setTokenUpdateCounter((prev) => prev + 1);
	};

	return (
		<BalProvider.Provider value={{ tokenBalances, refreshTokens }}>
			{children}
		</BalProvider.Provider>
	);
};

export default ProvideBal;
