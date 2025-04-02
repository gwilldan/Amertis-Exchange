"use client"

const NftCard = () => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    return (
        <div className="relative">

            <div
                className=" size-[300px] lg:size-[450px] relative transition-transform duration-200 ease-out rounded-2xl overflow-hidden shadow-lg bg-white/10 p-5 border border-gray-200/20 backdrop-blur-sm"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src="https://ipfs.io/ipfs/bafybeidnkn7mnsdt3bbal52b4iu6b6kttgmbpjxdxrql2vtouanbpu5vgi/letterFromOlympus.png"
                    alt="NFT"
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>
        </div>
    );
};

export default NftCard;
