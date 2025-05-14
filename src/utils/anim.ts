import { Variants } from "motion/react";

export const fadeIn = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	transition: {
		eas: "easeInOut",
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

export const slideIn_variant: Variants = {
	hidden: {
		width: 0,
	},
	show: {
		width: "60%",
		transition: {
			ease: "linear",
			duration: 0.25,
			delayChildren: 0.25,
		},
	},
};

export const single_slide: Variants = {
	hidden: { y: -5, opacity: 0 },
	show: { y: 0, opacity: 1 },
	exit: { y: 0, opacity: 0 },
};

export const slideInChild_variant: Variants = {
	hidden: { y: 0, opacity: 0 },
	show: { y: -10, opacity: 1 },
};

export const shakeIn: Variants = {
	hidden: { scale: 0.5, opacity: 0 },
	show: {
		scale: 1,
		opacity: 1,
		transition: {
			ease: "easeIn",
			duration: 0.25,
		},
	},
};

export const pageIn: Variants = {
	hidden: {
		opacity: 0,
		y: 0,
	},
	show: {
		opacity: 1,
		y: -10,
		transition: {
			ease: "easeIn",
			duration: 0.25,
		},
	},
};
