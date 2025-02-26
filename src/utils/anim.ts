export const fadeIn = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	transition: {
		ease: "linear",
		duration: 0.3,
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
		duration: 0.15,
	},
};
