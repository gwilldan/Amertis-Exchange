"use client";
import { erc20Abi, formatUnits, isAddress, parseUnits } from "viem";
import { useReadContracts } from "wagmi";
import { TbLoader2 } from "react-icons/tb";
import { Token } from "@/lib/interface";
import Image from "next/image";
import { useContext } from "react";
import { BalProvider } from "@/context/provideBal";


const CheckAndAddToken = ({ tokenAddress, walletAddress, handleTokenSelect }: { tokenAddress: `0x${string}`, walletAddress: `0x${string}`, handleTokenSelect: (token: Token) => void }) => {

    if (!isAddress(tokenAddress)) {
        return (
            <div className=" flex flex-col items-center justify-center h-full">
                <h1 >Token Not found!</h1>
            </div>
        )
    } else {
        return (
            <AddToken
                tokenAddress={tokenAddress}
                walletAddress={walletAddress}
                handleTokenSelect={handleTokenSelect}
            />
        )
    }
}

export default CheckAndAddToken;

const AddToken = ({ tokenAddress, walletAddress, handleTokenSelect }: { tokenAddress: `0x${string}`, walletAddress: `0x${string}`, handleTokenSelect: (token: Token) => void }) => {
    const { refreshTokens }: any = useContext(BalProvider);

    const { data, isLoading, isError } = useReadContracts({
        contracts: [
            {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "name",
            },
            {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "symbol",
            },
            {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "decimals",
            },
            {
                address: tokenAddress,
                abi: erc20Abi,
                functionName: "balanceOf",
                args: [walletAddress]
            },
        ],
        multicallAddress:
            "0xcA11bde05977b3631167028862bE2a173976CA11" as `0x${string}`,
    })


    if (isLoading) {
        return <div className="h-dvh grid place-content-center">
            <TbLoader2 className="w-10 h-10 animate-spin" />
        </div>
    }

    if (isError || !data) {
        return (
            <div className=" flex flex-col items-center justify-center h-full">
                <h1 >Error!</h1>
            </div>
        )
    }

    const token = {
        name: (data?.[0]?.result as string),
        ticker: (data?.[1]?.result as string),
        decimals: (data?.[2]?.result as number),
        balance: (data?.[3]?.result as bigint),
        icon: "/icons/token.svg",
        ca: tokenAddress,
    }

    const handleAddToken = () => {
        const newToken = {
            ca: tokenAddress,
            name: token.name,
            ticker: token.ticker,
            icon: token.icon,
            decimals: token.decimals,
        }

        const localStorageData = localStorage.getItem("userTokenList");

        if (!localStorageData) {
            const initialData = {
                [tokenAddress]: newToken
            };
            localStorage.setItem("userTokenList", JSON.stringify(initialData))
        } else {
            const userTokenList = JSON.parse(localStorageData);
            if (!userTokenList[tokenAddress]) {
                userTokenList[tokenAddress] = newToken;
                localStorage.setItem("userTokenList", JSON.stringify(userTokenList))
            }
        }
        refreshTokens();
        handleTokenSelect(token)
    }

    return (
        <li
            onClick={handleAddToken}
            className={` h-[60px] px-6 cursor-pointer  grid grid-cols-[10%_60%_30%] items-center overflow-hidden `}>
            <Image
                src={token.icon}
                alt="token"
                width={32}
                height={32}
                className="rounded-full"
            />
            <div className="ml-2 md:ml-0">
                <h1 className="">{token.ticker}</h1>
                <p className=" text-[12px] text-slate-400 font-semibold">
                    {token.name}
                </p>
            </div>

            {token.balance ? (
                <p className="text-right truncate">
                    {`
									${token.balance == BigInt(0) || !token.balance
                            ? "0.00"
                            : token.balance > parseUnits("0.001", token.decimals)
                                ? Number(
                                    formatUnits(token.balance, token.decimals)
                                )?.toFixed(3)
                                : " < 0.001 "
                        }`}{" "}
                </p>
            ) : (
                <p className="text-right truncate"></p>
            )}
        </li>
    )
};
