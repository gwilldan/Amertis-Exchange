import { StaticImageData } from "next/image";

export interface Token {
	ca: string;
	name: string;
	ticker: string;
	icon: string;
	decimals: number;
}

export interface IToken {
	[i: string]: Token

}

export interface ITokenList {
	[chainId: number]: IToken;
}

interface BalType {
	balance: BigInt;
}

export type TokenBalances = Token & BalType;
