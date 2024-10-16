"use client";
import { TbCopy } from "react-icons/tb";
import { useAccount, useChainId } from "wagmi";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/anim";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatUnits, parseUnits } from "viem";
import getWalletTokens from "./walletTokens";
import { TokenBalances } from "@/lib/interface";

const PortfolioData = () => {
	const { open } = useWeb3Modal();
	const chainId = useChainId();
	const { address } = useAccount();
	const [toggleHistory, setToggleHistory] = useState<boolean>(false);
	const [tokenBalances, setTokenBalances] = useState<TokenBalances[] | []>([]);

	// for clipboard
	const copyAddr = () => {
		navigator.clipboard.writeText(address as string);
	};

	console.log("tokenBalances ...  ", tokenBalances);

	useEffect(() => {
		console.log("trying... ");

		const fechtBals = async () => {
			if (address || chainId) {
				const tokenBalances = await getWalletTokens(chainId, address);
				setTokenBalances(tokenBalances);
			} else {
				console.error("There's no address or chainID");
			}
		};

		fechtBals();
	}, [chainId, address]);

	return (
		<motion.section
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			className=" pt-[115px] md:min-w-[300px] max-w-[1000px] mx-auto mb-[50px] ">
			<div className=" flex items-center justify-between">
				<div className=" flex items-center gap-2 ">
					<div className=" h-10 w-10 rounded-full border "></div>
					<div className=" ">
						<h3 className=" font-light ">My Account</h3>
						<div className=" flex items-center gap-2">
							<p className=" font-bold text-xl ">
								{address?.slice(0, 4) + "..." + address?.slice(-6)}
							</p>
							<TbCopy
								onClick={copyAddr}
								className=" active:text-mainFG text-xl cursor-pointer"
							/>
						</div>
					</div>
				</div>

				<div>
					<FiLogOut className="text-2xl cursor-pointer lg:hover:text-mainFG " />
				</div>
			</div>

			<main className=" mt-4 md:mt-6 mb-4 ">
				<div className=" flex items-center ">
					<button
						onClick={() => setToggleHistory(false)}
						className={` ${
							!toggleHistory ? "border-white " : "border-transparent"
						} px-4 py-1 border-b-2`}>
						Porfolio
					</button>
					<button
						onClick={() => setToggleHistory(true)}
						className={` px-4 py-1  border-b-2 ${
							toggleHistory ? "border-white" : "border-transparent"
						} `}>
						History
					</button>
				</div>
			</main>
			{toggleHistory ? (
				<History />
			) : (
				<WalletTokens tokenBalances={tokenBalances} />
			)}
		</motion.section>
	);
};

export default PortfolioData;

const WalletTokens = ({ tokenBalances }: any) => {
	return (
		<main className=" bg-mainLight mb-[50px] rounded-[16px] md:rounded-[20px] p-4 md:p-8 ">
			<header className="flex items-center justify-between border-b pb-3 mb-3 md:mb-5 ">
				<p>Assets</p>
				<p className=" hidden md:block ">Price</p>
				<p>Balance</p>
			</header>

			<ul className="flex-1 overflow-auto rounded-b-[30px] ">
				{tokenBalances?.map((_token: TokenBalances, index: number) => {
					return (
						<WalletToken
							_token={_token}
							key={index}
						/>
					);
				})}
			</ul>
		</main>
	);
};

const WalletToken = ({ _token }: any) => {
	return (
		<>
			{_token.bal && (
				<li
					className={`h-[60px] cursor-default items-center grid grid-cols-2 md:grid-cols-3 overflow-hidden `}>
					<span className="flex items-center md:gap-2 ">
						{_token.icon ? (
							<Image
								src={_token.icon}
								alt=""
								className=" h-8 w-8"
							/>
						) : (
							<div className=" h-8 w-8 rounded-full border-[0.5px] border-mainFG"></div>
						)}
						<div className="ml-2 md:ml-0">
							<h1 className="">{_token.ticker}</h1>
							<p className=" text-[12px] text-slate-400 font-semibold">
								{_token.name}
							</p>
						</div>
					</span>
					<p className="hidden md:block text-center ">
						{_token.price ? _token.price : "-"}
					</p>
					<p className="text-right truncate">
						{`
							${
								_token.bal > parseUnits("0.001", _token.decimals)
									? Number(formatUnits(_token.bal, _token?.decimals))?.toFixed(
											3
									  )
									: " < 0.001 "
							} ${_token.ticker}`}{" "}
					</p>
				</li>
			)}
		</>
	);
};

const History = () => {
	return <main className="  ">HISTORY SECTION</main>;
};
