import { StaticImageData } from "next/image";
import { GetBalanceReturnType } from "viem";

export interface IToken {
	ca: string;
	name: string;
	ticker: string;
	icon: string;
	decimals: number;
}

export interface ITokenList {
	[chainId: number]: IToken[];
}

interface BalType {
	bal: GetBalanceReturnType;
}

export type TokenBalances = IToken & BalType;
