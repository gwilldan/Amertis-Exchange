"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import WalletConnectSection from "./WalletConnectSection";

// icons
import { FiMenu } from "react-icons/fi";
import { BiWater } from "react-icons/bi";
import { HiArrowPath } from "react-icons/hi2";
import { MdDataUsage } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { SiGitbook } from "react-icons/si";

function Nav({}) {
	const path = usePathname();

	const [toggle, setToggle] = useState<boolean>(false);

	const toggleOff = () => {
		setToggle(false);
	};

	return (
		<div className=" backdrop-blur-md fixed top-0 w-full z-50">
			<div className=" bg-mainFG text-white h-[22px] text-xs flex items-center justify-center ">
				<p>Amertis on Monad testnet...</p>
			</div>

			<div className=" flex items-center gap-4 py-2 pr-3 pl-4 h-[58px] justify-between md:justify-start">
				<button>
					<Image
						src={"/Images/Logo.svg"}
						alt="Logo"
						width={32}
						loading="eager"
						fetchPriority="high"
						priority
						height={32}
					/>
				</button>

				{/* Tab and PC Links */}
				<div className=" md:text-darkSlate md:flex flex-1 md:items-center md:gap-8 md:text-sm md:ml-8 hidden">
					{links.map((_link: any) => (
						<Link
							key={_link.name}
							href={_link.href}
							onClick={toggleOff}
							className={` ${
								_link.href === path
									? "text-mainFG font-semibold "
									: "hover:text-slate-400"
							} flex items-center w-fit h-10 gap-4`}>
							{_link.name}
						</Link>
					))}
				</div>

				{/* ------wallet connect section */}
				<WalletConnectSection />

				{/* HAMBURGER BUTTON FOR MOBILE */}
				<button
					className=" md:hidden"
					onClick={() => setToggle(!toggle)}>
					<FiMenu className=" text-2xl text-darkBG font-extrabold " />
				</button>
			</div>

			{/* THE MOBILE NAV BAR */}
			<MobileNav
				toggle={toggle}
				toggleOff={toggleOff}
			/>
		</div>
	);
}

export default Nav;

const MobileNav = ({ toggle, toggleOff }: any) => {
	const path = usePathname();

	return (
		<div
			className={`transition-all ease-linear duration-200 overflow-hidden h-screen w-[224px] left-0 bg-mainBG absolute top-0 md:hidden ${
				toggle ? "left-0" : "left-[-224px]"
			}`}>
			<div className="h-full w-full flex flex-col justify-between pt-12 pb-8 pl-8 pr-4 drop-shadow-2xl">
				{/* Top Section and Links */}
				<div className=" flex flex-col gap-5 font-medium text-darkBG">
					{links.map((_link: any) => (
						<Link
							key={_link.name}
							href={_link.href}
							onClick={toggleOff}
							className={` ${
								_link.href === path
									? "text-mainFG font-bold "
									: "hover:text-slate-400"
							} flex items-center w-fit h-10 gap-4`}>
							{_link.icon}
							<h1 className=" font-normal">{_link.name}</h1>
						</Link>
					))}
				</div>

				{/* Bottom section */}
				<div className=" h-[123.5px] flex flex-col gap-4 justify-end">
					<button className=" flex justify-center items-center gap-2 text-white bg-darkBG rounded-lg h-9 w-[176px] shadow-md">
						<Image
							src={"/Images/mon.avif"}
							alt="mon"
							width={24}
							height={24}
						/>
						<h1>MON</h1>
						<div className=" text-white">
							<FiChevronDown />
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

const links = [
	{
		name: "Swap",
		href: "/",
		icon: <HiArrowPath className=" font-medium text-xl rotate-90" />,
	},
	{
		name: "Portfolio",
		href: "/portfolio",
		icon: <MdDataUsage className=" text-xl" />,
	},

	{
		name: "Bridge",
		href: "/bridge",
		icon: <SiGitbook className=" text-xl" />,
	},
	{
		name: "Pool",
		href: "/pool",
		icon: <BiWater className=" text-xl" />,
	},
];
