"use client";
import { Fragment, useState } from "react";
import { fadeIn } from "@/utils/anim";

// icons
import { FaGasPump } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { MdRoute } from "react-icons/md";
import { useChainId } from "wagmi";
import { TokenList } from "@/lib/TokenList";
import Image from "next/image";

type SwapData = {
	adapters: string[];
	amounts: bigint[];
	amountOut: string;
	baseForQuote: string;
	gasEstimate: bigint;
	path: string[];
	status: string;
};

type IInfo = {
	swapData: SwapData;
	baseToken: any;
	quoteToken: any;
};

const Info = ({ swapData, baseToken, quoteToken }: IInfo) => {
	const [showRoutes, setShowRoutes] = useState<boolean>(false);

	console.log("swap data...", swapData);

	if (!swapData.adapters.length) {
		return (
			<div className=" h-[50px] rounded-xl border border-white/20 bg-[#f1c1311a] backdrop-blur-xl my-4 flex justify-center items-center px-2 cursor-pointer text-[14px] text-red-500  ">
				🚫 No routes found
			</div>
		);
	}

	return (
		<>
			<section
				onClick={() => setShowRoutes(!showRoutes)}
				className=" h-[50px] rounded-xl border bg-glass my-4 flex justify-between items-center px-2 cursor-pointer lg:hover:border-mainFG text-[14px]">
				<div className=" flex items-center gap-2 ">
					<span className=" flex items-center gap-1">
						<Image
							src={baseToken.icon}
							alt="base"
							width={20}
							height={20}
							className="rounded-full"
						/>
						<p>{"1 " + baseToken.ticker}</p>
					</span>
					<span>=</span>
					<span className=" flex items-center gap-1">
						<Image
							src={quoteToken.icon}
							alt="base"
							width={20}
							height={20}
							className="rounded-full"
						/>

						<p>{Number(swapData.baseForQuote) + " " + quoteToken.ticker}</p>
					</span>
				</div>
				<div className=" flex items-center gap-1 font-light ">
					<FaGasPump />
					<p>$0.06</p>
					<FaChevronDown className={` ${showRoutes ? "" : ""}  ml-2`} />
				</div>
			</section>
			{showRoutes && (
				<SwapRoutes
					swapData={swapData}
					baseToken={baseToken}
					quoteToken={quoteToken}
				/>
			)}
		</>
	);
};

export default Info;

const SwapRoutes = ({ swapData }: IInfo) => {
	const chainId = useChainId();
	const tokenList = TokenList[chainId];

	return (
		<div className=" border bg-glass rounded-xl p-2 md:p-4 text-[14px] ">
			<span className="flex items-center ease-linear gap-2 mb-6">
				<div className=" p-2 bg-mainFG rounded-full text-center w-fit gap-2 animate-spin duration-1000 ">
					<MdRoute />
				</div>{" "}
				<p>Best Route</p>
			</span>

			<section className=" flex items-center justify-between my-2 ">
				{swapData.path?.map((path, index) => (
					<>
						<div
							key={path}
							style={{
								backgroundImage: `url('${
									tokenList.find(
										(p, i) => p.ca.toLowerCase() === path.toLowerCase()
									)?.icon ??
									"https://via.placeholder.com/100x100/8F199B/FFFFFF?text=?"
								}')`,
							}}
							// style={{
							//   backgroundImage: `url('${
							//     tokenList.find(
							//       (p, i) => p.ca.toLowerCase() === path.toLowerCase()
							//     )?.icon.src ??
							//     "https://via.placeholder.com/100x100/8F199B/FFFFFF?text=?"
							//   }')`,
							// }}
							className=" h-6 w-6 rounded-full bg-contain bg-center "></div>
						{index < swapData.path.length - 1 && (
							<hr className=" border border-dashed self-center flex-1 mx-1 md:mx-2 " />
						)}
					</>
				))}
			</section>
		</div>
	);
};
