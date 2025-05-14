"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import GET_HISTORY from "@/lib/graphQL";
import { useAccount, useChainId } from "wagmi";
import Image from "next/image";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { TbLoader2 } from "react-icons/tb";
import { TokenList } from "@/lib/TokenList";
import { formatTokenAmount } from "@/lib/utils";

const History = () => {
	const { address } = useAccount();

	const { data, loading, error, refetch } = useQuery(GET_HISTORY, {
		variables: { address: address },
		skip: !address,
		pollInterval: 10_000,
	});

	const [showHistory, setShowHistory] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowHistory(true);
		}, 300);

		return () => clearTimeout(timer);
	}, [address]);

	useEffect(() => {
		if (address) {
			refetch();
		}
	}, [address, refetch]);

	if (loading || !showHistory) {
		return (
			<div className="h-dvh grid place-content-center">
				<TbLoader2 className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="h-dvh grid place-content-center">
				<p>Error</p>
			</div>
		);
	}

	const history = data?.Account[0]?.transactions;

	return (
		<>
			<main className=" bg-glass mb-[50px] rounded-[16px] md:rounded-[20px] p-4 md:p-8 ">
				<header className="border-b pb-3 mb-3 md:mb-5 grid grid-cols-2 md:grid-cols-4 gap-3">
					<p className="">from</p>
					<p className="text-right md:text-center">to</p>
					<p>tx hash</p>
					<p className="text-right">timestamp</p>
				</header>

				<ul className="text-sm md:text-base flex-1 overflow-auto rounded-b-[30px] ">
					{history?.map((transaction: any) => (
						<div
							key={transaction.id}
							className="grid border-b border-b-white/10  grid-cols-2 md:grid-cols-4 md:border-none gap-3 items-center py-4">
							<TokenDisplay
								tokenDetails={transaction.tokenInDetails}
								amount={transaction._amountIn}
							/>
							<TokenDisplay
								tokenDetails={transaction.tokenOutDetails}
								amount={transaction._amountOut}
							/>
							<Hash hash={transaction.id} />
							<span className="text-right">
								{new Date(
									Number(transaction.timeStamp) * 1000
								).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>
					))}
				</ul>
			</main>
		</>
	);
};

export default History;

const Hash = ({ hash }: { hash: string }) => {
	const shortHash = hash.slice(0, 6) + " ... " + hash.slice(-6);
	return (
		<div className="flex items-center gap-2">
			<span className="md:text-center">{shortHash}</span>
			<Link
				href={`https://testnet.monadexplorer.com/tx/${hash}`}
				target="_blank">
				<ExternalLinkIcon className="w-4 h-4 cursor-pointer" />
			</Link>
		</div>
	);
};

const TokenDisplay = ({
	tokenDetails,
	amount,
}: {
	tokenDetails: { decimals: number; id: string; name: string; symbol: string };
	amount: string;
}) => {
	const chainId = useChainId();
	const tokenData = TokenList[chainId][tokenDetails.id];

	const formattedAmount = formatTokenAmount(
		BigInt(amount),
		tokenDetails.decimals
	);

	return (
		<span className={`flex items-center md:gap-2 `}>
			<Image
				src={tokenData ? tokenData.icon : "icons/token.svg"}
				alt="token icon"
				width={32}
				height={32}
				className="rounded-full "
			/>
			<div className="ml-2 md:ml-0">
				<h1 className="">
					{formattedAmount} {tokenDetails.symbol}
				</h1>
				<p className=" text-[12px] text-slate-400 font-semibold">
					{tokenDetails.name}
				</p>
			</div>
		</span>
	);
};
