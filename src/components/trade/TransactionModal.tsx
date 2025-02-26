"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { fadeIn } from "@/utils/anim";
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { AiFillWarning } from "react-icons/ai";

const TransactionModal = ({
	setTxModal,
	baseToken,
	quoteToken,
	txState,
	txErr,
}: // status,
any) => {
	const [baseTokenVar] = useState(baseToken);
	const [quoteTokenVar] = useState(quoteToken);
	const modalRef = useRef<any | null>();

	console.log("THE TX ERROR PASSED ON TO THE TRANSACTION MODAL....", txErr);

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setTxModal(false);
			}
		};

		addEventListener("mousedown", handleClickOutside);

		return () => removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<motion.main
			initial={fadeIn.initial}
			animate={fadeIn.animate}
			transition={fadeIn.transition}
			exit={fadeIn.initial}
			className=" w-dvw h-dvh bg-black bg-opacity-90 md:p-6 fixed top-0 z-50 flex items-center px-4 ">
			<section
				ref={modalRef}
				className=" z-10 w-full  md:w-[500px] border-[0.5px] border-mainFG bg-mainDark rounded-[15px] md:rounded-[30px] flex flex-col mx-auto p-4 ">
				{txState !== "success" && !txErr && (
					<section className=" flex flex-col items-center gap-4 my-[32px]">
						<AiOutlineLoading3Quarters className="text-4xl animate-spin duration-50 ease-linear" />
						<h2 className=" text-[20px] font-semibold ">
							{txState == "pending" ? "Transaction pending" : "Confirm Swap"}
						</h2>

						<div className=" flex items-center gap-2 ">
							<span className=" flex items-center gap-1">
								<div
									style={{
										backgroundImage: `url('${baseTokenVar?.icon.src}')`,
									}}
									className=" h-5 w-5 rounded-full bg-contain bg-center "></div>
								<p>{baseTokenVar?.inputValue + " " + baseTokenVar?.ticker}</p>
							</span>
							<FaArrowRightLong className="" />
							<span className=" flex items-center gap-1">
								<div
									style={{
										backgroundImage: `url('${quoteTokenVar?.icon.src}')`,
									}}
									className=" h-5 w-5 rounded-full bg-contain bg-center "></div>
								<p>{quoteTokenVar?.inputValue + " " + quoteTokenVar?.ticker}</p>
							</span>
						</div>

						{txState !== "pending" && (
							<p className=" font-extralight ">Approve wallet ransaction...</p>
						)}
					</section>
				)}

				{txErr && (
					<div className=" my-[32px] mx-auto w-fit text-center">
						<AiFillWarning className=" text-[50px] my-2 mx-auto" />
						<p>Error in transaction!!!</p>

						<button
							onClick={() => setTxModal(false)}
							className=" hover:bg-secFG px-4 py-2 mt-4 bg-mainFG rounded-[10px] text-white ">
							try again
						</button>
					</div>
				)}

				{txState == "success" && !txErr && (
					<section className=" my-[32px] mx-auto w-fit text-center ">
						<GiCheckMark className=" text-[50px] mx-auto" />
						<p className=" text-[20px] font-semibold my-2">
							Successfully swapped{" "}
						</p>
						<p>{`${baseTokenVar?.inputValue} ${baseTokenVar?.ticker} for ${quoteTokenVar?.inputValue} ${quoteTokenVar?.ticker} `}</p>
					</section>
				)}
			</section>
		</motion.main>
	);
};

export default TransactionModal;
