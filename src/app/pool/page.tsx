"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/anim";
import Link from "next/link";

const Pool = () => {
	const connected = true;

	return (
		<motion.main
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			className="px-6 min-h-[calc(100dvh-90px)] md:min-h-[calc(100dvh-70px)] "
		>
			{connected && <Welcome />}
		</motion.main>
	);
};

export default Pool;

const Welcome = () => {
	return (
		<section className=" pt-[115px] md:min-w-[300px] max-w-[1000px] mx-auto ">
			<h1 className=" font-semibold text-2xl">Liquidity Pools</h1>
			<div className=" mt-5 bg-mainLight rounded-[30px] h-[400px] grid place-content-center text-center px-4 ">
				<h1 className=" font-semibold text-[25px] md:text-[30px]">
					Hold on, buddy!!!
				</h1>
				<p className=" font-light text-[14px] mb-5 my-2">
					We are still building our pool interface ...
				</p>

				<Link
					href={"/"}
					className=" bg-mainFG lg:hover:bg-secFG w-fit px-8 py-2 mx-auto rounded-md "
				>
					Go to Swap
				</Link>
			</div>
		</section>
	);
};
