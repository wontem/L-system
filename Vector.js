export default {
	fromPolar (magnitude, angle) {
		return {
			x: magnitude * Math.cos(angle),
			y: magnitude * Math.sin(angle),
		};
	},

	sum (a, b) {
		return {
			x: a.x + b.x,
			y: a.y + b.y,
		};
	},

	diff (a, b) {
		return {
			x: a.x - b.x,
			y: a.y - b.y,
		};
	},

	scalarMul (a, s) {
		return {
			x: a.x * s,
			y: a.y * s,
		};
	},
};