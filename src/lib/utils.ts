"use client"
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TokenList } from "./TokenList";
import { IToken, ITokenList } from "./interface";
import { formatUnits } from "viem";
import { getChainId } from "@wagmi/core";
import { config } from "@/config";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const getTokensByChainId = (chainId: number): IToken => {
	return TokenList[chainId] || {};
};

export const formatTokenAmount = (amount: bigint, decimals: number, maxDecimals: number = 8): string => {
	const formattedAmount = formatUnits(amount, decimals);
	const numericValue = Number(formattedAmount);
	if (Number.isInteger(numericValue)) {
		return numericValue.toString();
	}
	const fullString = numericValue.toFixed(maxDecimals);
	let lastNonZeroIndex = fullString.length - 1;
	while (lastNonZeroIndex > 0 && fullString[lastNonZeroIndex] === '0') {
		lastNonZeroIndex--;
	}
	if (fullString[lastNonZeroIndex] === '.') {
		lastNonZeroIndex--;
	}
	return fullString.substring(0, lastNonZeroIndex + 1);
};

export const allTokens = () => {
	const chainId = getChainId(config)
	const defaultTokenList = TokenList[chainId]

	if (typeof window !== 'undefined') {
		const localStorageData = localStorage.getItem("userTokenList")
		if (!localStorageData) {
			return defaultTokenList;
		} else {
			const userTokenList = JSON.parse(localStorageData)
			return { ...defaultTokenList, ...userTokenList }
		}
	}

	return defaultTokenList;
}


