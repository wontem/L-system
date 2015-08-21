import defineLanguage from './lSystem';
import Store from './Store';
import V from './Vector';

function getOnStateChange (getCtx, generate) {
	var render;

	return function onStateChange (state, previousState) {
		var ctx = getCtx();

		if (state.generation !== previousState.generation) {
			render = generate(state.generation);
		}

		render(ctx, state.initialState, state.argumentsAlphabet);
	};
}

function getReducer (parameters) {
	return function reducer (state = parameters, action) {
		switch (action.type) {
			case 'changeAngles':
				return {
					...state,
					argumentsAlphabet: {
						...state.argumentsAlphabet,
						angleA: state.argumentsAlphabet.angleA + action.payload.angleA,
						angleB: state.argumentsAlphabet.angleB + action.payload.angleB,
					},
				};
			case 'changeGeneration':
				let generation = state.generation + action.payload;
				if (generation > (state.maxGeneration || 5) || generation < 0) {
					return state;
				}
				return {
					...state,
					generation: generation,
					argumentsAlphabet: {
						...state.argumentsAlphabet
					},
				};
			default:
				return state;
		}
	};
}

export default function wrapLSystem ({
	grammar,
	parameters,
	getCtx,
}) {
	var ctx = getCtx();
	var generate = defineLanguage(grammar);
	var store = new Store(getReducer(parameters), getOnStateChange(getCtx, generate));
	listenMouse(ctx.canvas, store);
}



function listenMouse (elem, store) {
	var pressed = false;
	var lastPos = null;

	elem.addEventListener('mousedown', function (e) {
		pressed = true;
	});

	window.addEventListener('mousemove', function (e) {
		var pos = {
			x: e.pageX,
			y: e.pageY,
		};

		if (pressed && lastPos) {
			let diff = V.diff(pos, lastPos);
			store.dispatch({
				type: 'changeAngles',
				payload: {
					angleA: (diff.x + diff.y) / 1000,
					angleB: (diff.x - diff.y) / 1000,
				}
			});
		}

		lastPos = pos;
	});

	window.addEventListener('mouseup', function (e) {
		pressed = false;
	});

	elem.addEventListener('wheel', function (e) {
		var delta = -e.deltaY / Math.abs(e.deltaY);

		store.dispatch({
			type: 'changeGeneration',
			payload: delta
		});
	});
};