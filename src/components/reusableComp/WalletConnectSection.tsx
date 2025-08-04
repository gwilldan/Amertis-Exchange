"use client";
import { BsEggFill } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Fragment, useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { config } from "@/config";
import { AnimatePresence, motion } from "framer-motion";
import { single_slide } from "@/utils/anim";

const WalletConnectSection = () => {
	return (
		<div className=" hidden md:flex items-center gap-2">
			<div className=" group relative ">
				<BsEggFill className=" shrink-0 text-2xl  " />
			</div>
			<ConnectButton />
		</div>
	);
};

export default WalletConnectSection;

export const ConnectButton = () => {
	const { isConnected, address } = useAccount();
	const { open } = useWeb3Modal();
	const [nadNs, setNadNs] = useState<{
		state: "idle" | "searching" | "searched";
		result?: string | null;
	}>({
		state: "idle",
		result: null,
	});

	useEffect(() => {
		if (!address) return;

		const fetchNadNs = async () => {
			try {
				setNadNs({
					state: "searching",
				});
				const data = await readContract(config, {
					abi: [
						{
							inputs: [
								{
									internalType: "address",
									name: "addr",
									type: "address",
								},
							],
							name: "getPrimaryNameForAddress",
							outputs: [
								{
									internalType: "string",
									name: "",
									type: "string",
								},
							],
							stateMutability: "view",
							type: "function",
						},
					],
					address:
						"0x3019BF1dfB84E5b46Ca9D0eEC37dE08a59A41308" as `0x${string}`,
					functionName: "getPrimaryNameForAddress",
					args: [address],
				});

				if (data) {
					setNadNs({
						state: "searched",
						result: `${data}.nad`,
					});
				} else {
					setNadNs({
						state: "searched",
						result: null,
					});
				}
			} catch (error) {
				console.error("error from fetching domains...", error);
				setNadNs({
					state: "searched",
					result: null,
				});
			}
		};
		fetchNadNs();
	}, [address]);

	return (
		<Fragment>
			<div className="relative">
				{isConnected ? (
					<button
						onClick={() => open({ view: "Account" })}
						className=" py-2 px-6 rounded-md bg-glass ">
						{nadNs.result ? (
							<span className="">{nadNs.result}</span>
						) : (
							<span className="">
								{`${address?.slice(0, 4)}...${address?.slice(-4)}`}
							</span>
						)}
					</button>
				) : (
					<button
						onClick={() => open()}
						className="rounded-xl bg-mainFG py-2 px-4 flex items-center gap-2 justify-center mx-auto lg:hover:bg-secFG">
						<>
							<IoWalletOutline className=" text-2xl" />
							Connect Wallet
						</>
					</button>
				)}

				<AnimatePresence>
					{nadNs.state === "searched" && !nadNs.result && isConnected && (
						<motion.a
							variants={single_slide}
							initial="hidden"
							animate="show"
							exit="exit"
							href="https://app.nad.domains"
							target="_blank"
							className=" bg-glass-yellow text-sm absolute top-[50px] right-0 text-yellow-300 block w-[200px] text-center hover:text-white ease-linear duration-150 transition-colors  ">
							Get your .nad domain
							<span className=" ml-2">→</span>
						</motion.a>
					)}
				</AnimatePresence>
			</div>
		</Fragment>
	);
};
