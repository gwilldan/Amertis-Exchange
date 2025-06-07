"use client";
import { useEffect, useState } from "react";
import { shakeIn } from "@/utils/anim";
import { AnimatePresence, motion } from "motion/react";
import { adapterList } from "@/lib/AdapterList";
import { RouteInfo } from ".";
import { calculatePriceImpact } from "@/utils/helper";

// icons
import { MdRoute } from "react-icons/md";
import { useChainId } from "wagmi";
import { TokenList } from "@/lib/TokenList";
import Image from "next/image";
import { formatUnits, parseUnits } from "viem";
import { formatTokenAmount } from "@/lib/utils";
import { TbLoader2 } from "react-icons/tb";

type SwapData = {
	adapters: string[];
	amounts: bigint[];
	amountOut: string;
	baseForQuote: string;
	gasEstimate: bigint;
	path: string[];
	status: string;
	decimal: number;
};

type IInfo = {
	swapData: SwapData;
	baseToken: any;
	quoteToken: any;
	fetchStatus: any;
	isFetching: boolean;
};

const Info = ({
	swapData,
	baseToken,
	quoteToken,
	fetchStatus,
	isFetching,
}: IInfo) => {

	if (isFetching) {
		return (
			<Container classNames="p-4 bg-glass">
				<div className="w-full h-full grid place-content-center ">
					<TbLoader2 className="w-10 h-10 animate-spin mx-auto text-yellow-400" />
					<div className="mx-auto mt-2 text-yellow-400">
						Fetching best route
					</div>
				</div>
			</Container>
		);
	}

	if (swapData?.adapters?.length === 0) {
		return (
			<Container classNames="grid place-content-center bg-glass-yellow ">
				<p className="text-large">🚫 No routes found, check other pairs</p>
			</Container>
		);
	}

	if (!swapData || !swapData.amountOut) {
		return (
			<Container classNames="bg-glass p-4">
				<RouteInfo />
			</Container>
		);
	}


	const priceImpact = calculatePriceImpact(
		swapData.baseForQuote,
		formatUnits(swapData.amounts[0], baseToken?.decimals),
		swapData.amountOut,
		swapData.decimal
	);

	// if (swapData.path.length > 2) {
	// 	return (
	// 			<div className=" h-[50px] rounded-xl border border-white/20 bg-[#f1c1311a] backdrop-blur-xl my-4 flex justify-center items-center px-2 cursor-pointer text-[14px] text-red-500  ">
	// 				🚫 This swap will likely fail. Try a different pair.
	// 			</div>
	// 	);
	// }

	return (
		<Container classNames="py-3 px-4 bg-glass">
			<div className=" flex justify-between items-center w-full">
				<p>{`1 ${baseToken.ticker} = ${formatTokenAmount(
					parseUnits(swapData.baseForQuote, quoteToken.decimals),
					quoteToken.decimals,
					8
				)} ${quoteToken.ticker}`}</p>
				<span className="flex items-center gap-2">
					<div className=" p-2 bg-mainFG rounded-full text-center w-fit gap-2 animate-spin duration-1000 ">
						<MdRoute />
					</div>{" "}
					<p>Best Route</p>
				</span>
			</div>
			<p
				className={`text-[12px] -mt-1 mb-3 ${priceImpact === null
					? "text-[#e832fd]"
					: priceImpact < 0
						? "text-green-500"
						: priceImpact < 15
							? "text-[#e832fd]"
							: priceImpact < 40
								? "text-yellow-400"
								: "text-red-500"
					}`}>
				Price impact: {priceImpact} %
				{priceImpact === null
					? ""
					: priceImpact > 40 && <span className="ml-2">⚠️ ⚠️ ⚠️ </span>}
			</p>

			<SwapRoutes
				baseToken={baseToken}
				quoteToken={quoteToken}
				swapData={swapData}
				fetchStatus={fetchStatus}
				isFetching={isFetching}
			/>
		</Container>
	);
};

export default Info;

const SwapRoutes = ({ swapData }: IInfo) => {
	const [adapter, setAdapter] = useState<{
		name: string;
		image: string;
	} | null>();

	const chainId = useChainId();
	const tokenList = TokenList[chainId];

	useEffect(() => {
		const adapter = swapData.adapters[0] as string;
		setAdapter(adapterList[adapter]);
		console.log("swap Data...", swapData)
		console.log("paths...", swapData?.adapters.map((p) => adapterList[p]?.name ))

	}, [swapData]);

	return (
		<div className="">
			<section className=" flex items-center justify-between my-2 rounded-full gap-2 ">
				<div
					style={{
						backgroundImage: `url('${tokenList[swapData.path[0]]?.icon ?? "/icons/token.svg"
							}')`,
					}}
					className=" h-6 w-6 rounded-full bg-contain bg-center b"></div>

				<div className=" flex-1 relative ">
					<div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
						<div className="line-shine-effect"></div>
					</div>
					<div className="absolute inset-0 grid place-content-center ">
						{adapter && (
							<div className=" bg-slate-100 text-black px-5 py-1 rounded-xl flex items-center gap-2">
								<Image
									src={adapter.image}
									alt="adt"
									width={20}
									height={20}
									className="rounded-full"
								/>
								<p>{adapter?.name}</p>
							</div>
						)}
					</div>
				</div>
				<div
					style={{
						backgroundImage: `url('${tokenList[swapData.path[swapData.path.length - 1]]?.icon ??
							"/icons/token.svg"
							}')`,
					}}
					className=" h-6 w-6 rounded-full bg-contain bg-center b"></div>
			</section>
		</div>
	);
};

const Container = ({
	children,
	classNames = "bg-glass",
}: {
	children: React.ReactNode;
	classNames?: string;
}) => {
	return (
		<main
			className={`h-[110px] rounded-xl border my-4 text-[14px] overflow-hidden ${classNames} `}>
			<motion.div
				variants={shakeIn}
				initial="hidden"
				animate="show"
				exit="hidden">
				{children}
			</motion.div>
		</main>
	);
};
