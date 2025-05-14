import { formatUnits, parseUnits } from "viem";

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

// check the calculation of this price impact again, make sure to handle the calculations in bigInt before returning the percentage in number form

export const calculatePriceImpact = (
	baseForQuote: string,
	amountIn: bigint,
	amountOut: string,
	decimal: number
) => {
	if (!baseForQuote || !amountIn || !amountOut) return null;

	const formattedBaseForQuote = Number(baseForQuote);
	const formattedAmountIn = Number(formatUnits(amountIn, decimal));
	const formattedAmountOut = Number(amountOut);

	// console.log(
	// 	"baseForQuote",
	// 	formattedBaseForQuote,
	// 	typeof formattedBaseForQuote
	// );
	// console.log("formattedAmountIn", formattedAmountIn, typeof formattedAmountIn);
	// console.log("amountout", formattedAmountOut, typeof formattedAmountOut);

	const expectedAmountOut = formattedBaseForQuote * formattedAmountIn;

	// console.log("expected amount...", expectedAmountOut);

	return ((expectedAmountOut - formattedAmountOut) / expectedAmountOut) * 100;
};
