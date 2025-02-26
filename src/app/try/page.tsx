function page() {
	return (
		<div
			className="relative h-dvh w-dvw flex items-center justify-center"
			style={{ background: "hsl(240 10% 3.9%)" }}>
			{/* Background gradient circles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div
					className="absolute -left-20 top-1/4 w-72 h-72 rounded-full"
					style={{
						background: "#8f199b",
						filter: "blur(100px)",
						opacity: "0.4",
					}}></div>
				<div
					className="absolute -right-20 bottom-1/4 w-72 h-72 rounded-full"
					style={{
						background: "#8f199b",
						filter: "blur(100px)",
						opacity: "0.2",
					}}></div>
			</div>

			<div className="relative z-10 w-full max-w-lg mx-4">
				<div className="backdrop-blur-xl bg-white/[0.07] border border-white/[0.1] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] p-8">
					<div className="flex items-center gap-3 mb-6">
						{/* <Sparkles className="w-6 h-6 text-[#8f199b]" /> */}
						<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8f199b] to-[#c026d3]">
							Glass Effect
						</h1>
					</div>

					<p className="text-gray-300 leading-relaxed mb-8">
						Experience the beauty of modern glassmorphism design. This component
						features a sophisticated blur effect combined with subtle
						transparency and elegant lighting.
					</p>

					<div className="flex flex-col gap-4">
						<div className="group flex items-center justify-between p-4 rounded-lg backdrop-blur-md bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300">
							<span className="text-gray-200">Explore Features</span>
							{/* <ArrowRight className="w-5 h-5 text-[#8f199b] group-hover:translate-x-1 transition-transform" /> */}
						</div>

						<div className="group flex items-center justify-between p-4 rounded-lg backdrop-blur-md bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300">
							<span className="text-gray-200">Learn More</span>
							{/* <ArrowRight className="w-5 h-5 text-[#8f199b] group-hover:translate-x-1 transition-transform" /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default page;
