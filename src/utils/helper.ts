import { erc20Abi, formatUnits, parseUnits, zeroAddress } from "viem";
import { readContracts } from "@wagmi/core";
import { TokenList } from "@/lib/TokenList";
import { config } from "@/config";

export function calculateSlippageAdjustedOutput(
	expectedOutput: bigint,
	slippagePercentage: number = 5
) {
	const slippageAmount = BigInt(
		Math.floor((slippagePercentage / 100) * Number(expectedOutput))
	);
	const adjustedOutput = expectedOutput - slippageAmount;
	return adjustedOutput;
}

export const calculatePriceImpact = (
	baseForQuote: string,
	amountIn: string,
	amountOut: string,
	decimals: number
) => {
	if (!baseForQuote || !amountIn || !amountOut) return null;

	const price = parseUnits(baseForQuote, decimals);
	const formattedAmountIn = parseUnits(amountIn, decimals);
	const expectedAmountOut =
		(price * formattedAmountIn) / BigInt(10 ** decimals);
	const actualAmountOut = parseUnits(amountOut, decimals);

	if (expectedAmountOut === BigInt(0)) return null;

	const impact =
		((expectedAmountOut - actualAmountOut) * BigInt(10_000)) /
		expectedAmountOut;

	return Number(impact) / 100;
};

interface Token {
	tokenBalance: bigint;
	inputValue: string;
	ca: string;
	name: string;
	ticker: string;
	icon: string;
	price: string;
	decimals: number;
}

const getTokenDetails = async (ca: `0x${string}`, address?: `0x${string}`) => {
	try {
		const res = await readContracts(config, {
			contracts: [
				{
					address: ca,
					abi: erc20Abi,
					functionName: "name",
				},
				{
					address: ca,
					abi: erc20Abi,
					functionName: "symbol",
				},
				{
					address: ca,
					abi: erc20Abi,
					functionName: "decimals",
				},
				{
					address: ca,
					abi: erc20Abi,
					functionName: "balanceOf",
					args: [address ?? zeroAddress]
				},
			],
			multicallAddress:
				"0xcA11bde05977b3631167028862bE2a173976CA11" as `0x${string}`,
		})

		const [name, symbol, decimals, balance] = res;

		if (name.status === "failure" || symbol.status === "failure" || decimals.status === "failure") {
			return null
		}



		return {
			name: name.result,
			symbol: symbol.result,
			decimals: decimals.result,
			tokenBalance: !address ? BigInt(0) : balance.result,
		};
	} catch (error) {
		console.log(error);
		return null;
	}

};


// export const checkAndSet = async (isBase: boolean, ca: string | null): Promise<Token> => {
// 	const tokenList = TokenList[10143]

// 	const defaultToken: Token = isBase ? {
// 		...(tokenList as Record<string, any>)[
// 		"0x0000000000000000000000000000000000000000"
// 		],
// 		tokenBalance: BigInt(0),
// 		inputValue: "",
// 		price: "",
// 	} : {
// 		tokenBalance: BigInt(0),
// 		inputValue: "",
// 		ca: "",
// 		name: "",
// 		ticker: "",
// 		icon: "",
// 		price: "",
// 		decimals: 0,
// 	}

// 	if (ca === null) {
// 		return defaultToken
// 	}

// 	const isTokenListed = tokenList[ca]

// 	if (isTokenListed) {
// 		return {
// 			...isTokenListed,
// 			inputValue: "",
// 			price: "",
// 			tokenBalance: BigInt(0)
// 		}
// 	} else {
// 		try {
// 			const tokenDetails = await getTokenDetails(ca as `0x${string}`)
// 			if (!tokenDetails) return defaultToken

// 			return {
// 				tokenBalance: BigInt(0),
// 				inputValue: "",
// 				ca: ca,
// 				name: tokenDetails.name,
// 				ticker: tokenDetails.symbol,
// 				icon: "",
// 				price: "",
// 				decimals: tokenDetails.decimals
// 			}
// 		} catch (error) {
// 			console.error("Error fetching token details:", error)
// 			return defaultToken
// 		}
// 	}
// }

export const checkTokens = async (baseTokenCA: `0x${string}`, quoteTokenCA: `0x${string}`, setBaseToken: (x: Token) => void, setQuoteToken: (x: Token) => void, address: `0x${string}`) => {
	const baseToken = TokenList[10143][baseTokenCA]
	const quoteToken = TokenList[10143][quoteTokenCA]

	try {
		if (!baseToken && !quoteToken) {
			const response = await Promise.all([
				getTokenDetails(baseTokenCA, address), getTokenDetails(quoteTokenCA, address)
			])

			const baseTokenDetails = response[0]
			const quoteTokenDetais = response[1]

			console.log('res...', response)

			if (baseTokenDetails) {
				const BT: Token = {
					ca: baseTokenCA,
					decimals: baseTokenDetails.decimals,
					name: baseTokenDetails.name,
					ticker: baseTokenDetails.symbol,
					tokenBalance: baseTokenDetails.tokenBalance as bigint,
					icon: "",
					inputValue: "",
					price: "",
				}
				setBaseToken(BT)
			}
			if (quoteTokenDetais) {
				const QT: Token = {
					ca: quoteTokenCA,
					decimals: quoteTokenDetais.decimals,
					name: quoteTokenDetais.name,
					ticker: quoteTokenDetais.symbol,
					icon: "",
					inputValue: "",
					price: "",
					tokenBalance: quoteTokenDetais.tokenBalance as bigint,
				}
				setQuoteToken(QT)
			}

		} else if (!baseToken) {

			const baseTokenDetails = await getTokenDetails(baseTokenCA, address)

			if (baseTokenDetails) {
				const BT: Token = {
					ca: baseTokenCA,
					decimals: baseTokenDetails.decimals,
					name: baseTokenDetails.name,
					ticker: baseTokenDetails.symbol,
					tokenBalance: baseTokenDetails.tokenBalance as bigint,
					icon: "",
					inputValue: "",
					price: "",
				}
				setBaseToken(BT)
			}
			setQuoteToken({
				...quoteToken, price: "", inputValue: "", tokenBalance: BigInt(0)
			})
		} else if (!quoteToken) {
			const quoteTokenDetais = await getTokenDetails(quoteTokenCA, address)

			if (quoteTokenDetais) {
				const QT: Token = {
					ca: baseTokenCA,
					decimals: quoteTokenDetais.decimals,
					name: quoteTokenDetais.name,
					ticker: quoteTokenDetais.symbol,
					tokenBalance: quoteTokenDetais.tokenBalance as bigint,
					icon: "",
					inputValue: "",
					price: "",

				}
				setQuoteToken(QT)
			}
			setBaseToken({
				...baseToken, price: "", inputValue: "", tokenBalance: BigInt(0)
			})
		} else {
			setBaseToken({
				...baseToken, price: "", inputValue: "", tokenBalance: BigInt(0)
			})
			setQuoteToken({
				...quoteToken, price: "", inputValue: "", tokenBalance: BigInt(0)
			})
		}
	} catch (error) {
		console.log("error from checkTokens", error)
	}
}