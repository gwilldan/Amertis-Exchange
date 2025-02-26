export const fadeIn = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	transition: {
		ease: "easeInOut",
		duration: 0.15,
	},
};

export const zoomIn = {
	initial: {
		opacity: 0,
		scale: 0.9,
	},
	animate: {
		opacity: 1,
		scale: 1,
	},
	transition: {
		ease: "easeInOut",
		duratio: 0.15,
	},
};

export const slideIn_variant = {
	hidden: {
		width: 0,
	},
	show: {
		width: "60%",
		transition: {
			ease: "linear",
			duration: 0.15,
			delayChildren: 1,
		},
	},
};

export const slideInChild_variant = {
	hidden: { y: 0, opacity: 0 },
	show: { y: -10, opacity: 1 },
};
