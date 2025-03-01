"use server";
import { getBalance, readContracts } from "@wagmi/core";
import { erc20Abi } from "viem";
import { config } from "@/config";
import { TokenList } from "./TokenList";

export async function getTokenBalances(walletAddress: string) {
	try {
		console.log("address...", walletAddress);

		if (!walletAddress) {
			return;
		}

		const tokens = TokenList[config.chains[0].id];

		const calls = tokens.map((token) => ({
			address: token.ca as `0x${string}`,
			abi: erc20Abi,
			functionName: "balanceOf",
			args: [walletAddress],
		}));

		const results = await readContracts(config, { contracts: calls });

		const monBal = await getBalance(config, {
			address: walletAddress as `0x${string}`,
		});

		return tokens
			.map((token, index) => ({
				...token,
				balance:
					token.ticker.toUpperCase() === "MON"
						? monBal.value
						: (results[index]?.result as BigInt),
			}))
			.sort((a, b) => Number(b.balance) - Number(a.balance));
	} catch (error) {
		console.error("error from getTokenBalance...", error);
		return;
	}
}
