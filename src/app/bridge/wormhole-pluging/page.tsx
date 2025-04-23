"use client"
import WormholeConnect, {
    WormholeConnectConfig,
} from '@wormhole-foundation/wormhole-connect';

const config: WormholeConnectConfig = {
    // You can use Connect with testnet chains by specifying "network":
    network: 'Testnet',
    chains: ['ArbitrumSepolia', 'BaseSepolia'],
    rpcs: {
        Sepolia: 'https://eth-sepolia.g.alchemy.com/v2/demo',
        ArbitrumSepolia: 'https://arbitrum-sepolia-rpc.publicnode.com',
        BaseSepolia: 'https://base-sepolia-rpc.publicnode.com',
        OptimismSepolia: 'https://optimism-sepolia.g.alchemy.com/v2/demo',
        // Monad: 'https://testnet-rpc.monad.xyz/',
    },
};

export default function Page() {
    return <main className=" lg:py-[100px] py-[150px] grid place-items-center h-screen">
        <WormholeConnect config={config} />
    </main>
}