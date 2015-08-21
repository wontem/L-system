import wrapLSystem from './wrapLSystem.js';

var cvs = document.createElement('canvas');
var ctx = cvs.getContext('2d');

cvs.width = 1000;
cvs.height = 1000;
document.body.appendChild(cvs);





/////////////////////////
// sierpinski triangle //
/////////////////////////

// wrapLSystem({
// 	grammar: {
// 		type: 'curve',
// 		axiom: ['A'],
// 		rules: {
// 			'A': '+B-A-B+'.split(''),
// 			'B': '-A+B+A-'.split(''),
// 		},
// 		tokensAlphabet: {
// 			'A': ['forward: draw'],
// 			'B': ['forward: draw'],
// 			'+': ['rotate: angleA'],
// 			'-': ['rotate: angleB'],
// 		},
// 	},
// 	parameters: {
// 		generation: 4,
// 		maxGeneration: 5,
// 		argumentsAlphabet: {
// 			angleA: Math.PI / 3,
// 			angleB: -Math.PI / 3,
// 			draw: true,
// 		},
// 	},
// 	getCtx: (ctx => {
// 		return () => {
// 			ctx.canvas.width = ctx.canvas.width;
// 			ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
// 			ctx.scale(10, 10);
// 			ctx.lineWidth = 1/10;

// 			return ctx;
// 		}
// 	})(ctx),
// });



//////////////////////
// pithagoras three //
//////////////////////


// wrapLSystem({
// 	grammar: {
// 		type: 'curve',
// 		axiom: ['0'],
// 		rules: {
// 			'0': ['1', '[', '0', ']', '0'],
// 			'1': ['1', '1'],
// 		},
// 		tokensAlphabet: {
// 			'[': ['save', 'rotate: angleA'],
// 			']': ['restore', 'rotate: angleB'],
// 			'0': ['color: colorA', 'forward: draw'],
// 			'1': ['color: colorB', 'forward: draw'],
// 		},
// 	},
// 	parameters: {
// 		generation: 4,
// 		maxGeneration: 10,
// 		initialState: {
// 			angle: -Math.PI / 2,
// 		},
// 		argumentsAlphabet: {
// 			angleA: Math.PI / 4,
// 			angleB: -Math.PI / 4,
// 			colorA: 'green',
// 			colorB: 'brown',
// 			draw: true,
// 		},
// 	},
// 	getCtx: (ctx => {
// 		return () => {
// 			ctx.canvas.width = ctx.canvas.width;
// 			ctx.translate(ctx.canvas.width / 2, ctx.canvas.height);
// 			ctx.scale(10, 10);
// 			ctx.lineWidth = 1/10;

// 			return ctx;
// 		}
// 	})(ctx),
// });



//////////////////
// dragon curve //
//////////////////

// wrapLSystem({
// 	grammar: {
// 		type: 'curve',
// 		axiom: ['F', 'X'],
// 		rules: {
// 			'X': 'X+YF+'.split(''),
// 			'Y': '-FX-Y'.split(''),
// 		},
// 		tokensAlphabet: {
// 			'X': [],
// 			'Y': [],
// 			'F': ['forward: draw'],
// 			'+': ['rotate: angleA'],
// 			'-': ['rotate: angleB'],
// 		},
// 	},
// 	parameters: {
// 		generation: 4,
// 		maxGeneration: 10,
// 		initialState: {
// 			angle: -Math.PI / 2,
// 		},
// 		argumentsAlphabet: {
// 			angleA: Math.PI / 180 * 90,
// 			angleB: -Math.PI / 180 * 90,
// 			draw: true,
// 		},
// 	},
// 	getCtx: (ctx => {
// 		return () => {
// 			ctx.canvas.width = ctx.canvas.width;
// 			ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
// 			ctx.scale(10, 10);
// 			ctx.lineWidth = 1/10;

// 			return ctx;
// 		}
// 	})(ctx),
// });


///////////
// plant //
///////////

wrapLSystem({
	grammar: {
		type: 'curve',
		axiom: 'X'.split(''),
		rules: {
			'X': 'F-[[X]+X]+F[+FX]-X'.split(''),
			'F': 'FF'.split(''),
		},
		tokensAlphabet: {
			'X': [],
			'F': ['forward: draw'],
			'+': ['rotate: angleA'],
			'-': ['rotate: angleB'],
			'[': ['save'],
			']': ['restore'],
		},
	},
	parameters: {
		generation: 4,
		maxGeneration: 5,
		initialState: {
			angle: -Math.PI / 2,
		},
		argumentsAlphabet: {
			angleA: Math.PI / 180 * 25,
			angleB: -Math.PI / 180 * 25,
			draw: true,
		},
	},
	getCtx: (ctx => {
		return () => {
			ctx.canvas.width = ctx.canvas.width;
			ctx.translate(ctx.canvas.width / 2, ctx.canvas.height);
			ctx.scale(10, 10);
			ctx.lineWidth = 1/10;

			return ctx;
		}
	})(ctx),
});