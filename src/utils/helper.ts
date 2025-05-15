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

	console.log("amount in", amountIn);
	console.log("formatted amount in", formattedAmountIn);
	console.log("expected amount out...", expectedAmountOut);

	if (expectedAmountOut === BigInt(0)) return null;

	const impact =
		((expectedAmountOut - actualAmountOut) * BigInt(10_000)) /
		expectedAmountOut;

	return Number(impact) / 100;
};
