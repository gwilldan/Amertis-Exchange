import { adapterList } from "@/lib/AdapterList";
import Image from "next/image";
import { LXGW_WenKai_Mono_TC } from "next/font/google";

type List = {
	name: string;
	image: string;
	ca: string;
};

const lxgw = LXGW_WenKai_Mono_TC({
	weight: ["300"],
	subsets: ["latin"],
});

const RouteInfo = () => {
	const adapters = refineList(adapterList);
	return (
		<div className="rounded-2xl overflow-hidden ">
			<h2 className={`${lxgw.className}`}>
				Access any and every token from these Exchanges in a single click.
			</h2>
			<div className="flex gap-4 justify-center items-center pt-1 ">
				{adapters.map((adapter: List) => (
					<div key={adapter.ca} className="relative size-[28px] md:size-[34px]">
						<Image
						key={adapter.ca}
						src={adapter.image}
						alt={adapter.name}
						fill
						style={{
							objectFit: "contain"
						}}
					/>
					</div>
					
				))}
			</div>
		</div>
	);
};

export default RouteInfo;

const refineList = (adapterList: { [k: string]: List }): List[] => {
	const newList: List[] = [];

	Object.values(adapterList).forEach((adapter) => {
		if (!adapter || adapter.name.toLowerCase() === "MonWrapper".toLowerCase())
			return;

		const duplicate = newList.find(
			(val) => adapter.image.toLowerCase() === val.image.toLowerCase()
		);

		if (!duplicate) {
			newList.push(adapter);
		}
	});

	return newList;
};
