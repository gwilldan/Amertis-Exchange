import Image from "next/image";
import { formatUnits } from "viem";

const BottomSearchSection = ({
	handleTokenSelect,
	quoteToken,
	baseToken,
	newTokenList,
	balLoading,
}: any) => {
	return (
		<ul className="flex-1 overflow-auto rounded-b-[30px] py-4 ">
			{balLoading ? (
				<div className=" w-full h-full grid place-content-center">
					<p>Loading...</p>
				</div>
			) : (
				newTokenList.map((_tokens: any, index: any) => {
					return (
						<li
							key={index}
							onClick={() => handleTokenSelect(_tokens)}
							className={` ${
								baseToken.ticker === _tokens.ticker ||
								quoteToken.ticker === _tokens.ticker
									? "opacity-40"
									: "lg:hover:bg-mainLight"
							} h-[60px] px-6 cursor-pointer  grid grid-cols-[10%_60%_30%] items-center overflow-hidden`}>
							{_tokens.icon ? (
								<Image
									src={_tokens.icon}
									alt="token"
									width={32}
									height={32}
									className="rounded-full"
								/>
							) : (
								<div className=" h-8 w-8 rounded-full bg-mainLight border-[0.5px] border-secFG "></div>
							)}
							<div className="ml-2 md:ml-0">
								<h1 className="">{_tokens.ticker}</h1>
								<p className=" text-[12px] text-slate-400 font-semibold">
									{_tokens.name}
								</p>
							</div>

							<p className="text-right truncate">
								{_tokens.bal
									? Number(
											formatUnits(_tokens.bal, _tokens?.decimals)
									  )?.toFixed(3)
									: "0.00"}
							</p>
						</li>
					);
				})
			)}
		</ul>
	);
};

export default BottomSearchSection;
