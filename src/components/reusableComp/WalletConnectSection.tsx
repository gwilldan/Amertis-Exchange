"use client";
import { BsEggFill } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Fragment, useEffect, useState } from "react";

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
	const [nadNs, setNadNs] = useState<string | null>(null);

	useEffect(() => {

		if (!address) return;

		const fetchNadNs = async () => {
			const response = await fetch(`https://api.nad.domains/v1/protocol/primary-name/${address}?chainId=${10143}`);
			const data = await response.json();

			if (data.success) {
				setNadNs(data.primaryName);
			} else {
				setNadNs(null);
			}
		};
		fetchNadNs();
	}, [address]);


	return (
		<Fragment>
			{isConnected ? (
				<button
					onClick={() => open({ view: "Account" })}
					className=" py-2 px-6 rounded-md bg-glass ">
					{nadNs ? (
						<span className="">
							{nadNs}
						</span>
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
		</Fragment>
	);
};
