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
