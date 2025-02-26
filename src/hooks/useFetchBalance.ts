import { getBalance } from "viem/actions";
import { useAccount, useBalance } from "wagmi";
import { useChainId } from "wagmi";

const useFetchBalance = (
	walletAddress: `0x${string}`,
	scopeKey: string,
	tokenAddress?: string
) => {
	const { chainId } = useAccount();
	const chain = useChainId();
	const tokenName = scopeKey.split("-")[1];
	const isChainCorrect = chainId === chain;

	const result = useBalance({
		address:
			isChainCorrect && tokenAddress
				? (walletAddress as `0x${string}`)
				: undefined,
		blockTag: "latest",
		// scopeKey: scopeKey ?? undefined,
		token:
			tokenName?.toLowerCase() === "ethereum"
				? undefined
				: (tokenAddress as `0x${string}`),
	});

	return {
		data: result.data?.value,
		status: result.status,
		isLoading: result.isLoading,
		isError: result.isError,
		error: result.error,
	};
};

export default useFetchBalance;
