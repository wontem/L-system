import V from './Vector';


const ACTIONS = {
	curve: {
		save: function (state, ctx) {
			return {
				...state,
				prevState: state,
			};
		},

		restore: function (state, ctx) {
			return {
				...state.prevState,
			};
		},

		rotate: function (state, ctx, angle) {
			return {
				...state,
				angle: state.angle + angle,
			};
		},

		color: function (state, ctx, color = 'black') {
			ctx.strokeStyle = color;
			return state;
		},

		forward: function (state, ctx, draw = false) {
			var vector = V.fromPolar(1, state.angle);
			var nextState =  {
				...state,
				point: V.sum(state.point, vector),
			};

			if (draw) {
				ctx.beginPath();
				ctx.moveTo(state.point.x, state.point.y);
				ctx.lineTo(nextState.point.x, nextState.point.y);
				ctx.stroke();
			}

			return nextState;
		},
	}
};



function getTokens (tokens, rules, allowedTokens) {
	var newTokens = [];

	tokens.forEach((token, i, tokens) => {
		var toAdd = [];

		if (rules.hasOwnProperty(token)) {
			let rule = rules[token];

			if (typeof rule == 'function')  {
				toAdd = rule(tokens[i - 1], tokens[i + 1]);
			} else {
				toAdd = rule;
			}
		} else if (allowedTokens.indexOf(token) !== -1) {
			toAdd = token;
		} else {
			throw Error(`Unknown token: ${token}`);
		}

		newTokens = newTokens.concat(toAdd);
	});

	return newTokens;
}

function generateTokens (grammar, generation) {
	var tokens = grammar.axiom;
	var allowedTokens = Object.keys(grammar.tokensAlphabet);

	while (generation--) {
		tokens = getTokens(tokens, grammar.rules, allowedTokens);
	}

	return tokens;
}


function parseCommand (command, actionsAlphabet) {
	var [actionName, args] = command.replace(/\s/g, '').split(':');
	var action = actionsAlphabet[actionName];
	args = args ? args.split(',') : [];

	// console.log(`${actionName}(${args.join(', ')})`);

	return { action, args };
}

function getCommandsAlphabet (tokensAlphabet, actionsAlphabet) {
	var commandsAlphabet = {};

	for (let token in tokensAlphabet) {
		let commands = tokensAlphabet[token];
		let i = commands.length;

		while (i--) {
			let command = commands[i];
			commandsAlphabet[command] = parseCommand(command, actionsAlphabet);
		}
	}

	return commandsAlphabet;
}

function run (initialState, ctx, tokens, tokensAlphabet, commandsAlphabet, argumentsAlphabet) {
	var state = {
		angle: 0,
		point: {
			x: 0,
			y: 0,
		},
		...initialState,
	};

	tokens.forEach(token => {
		tokensAlphabet[token].forEach(command => {
			var {action, args} = commandsAlphabet[command];
			args = args.map(arg => argumentsAlphabet[arg]);

			state = action(state, ctx, ...args);
		});
	});
}


export default function defineLanguage (grammar) {
	var tokensAlphabet = grammar.tokensAlphabet;
	var actionsAlphabet = ACTIONS[grammar.type];
	var commandsAlphabet = getCommandsAlphabet(tokensAlphabet, actionsAlphabet);

	return function generator (generation) {
		var tokens = generateTokens(grammar, generation);

		return function render (ctx, initialState, argumentsAlphabet) {
			run(initialState, ctx, tokens, tokensAlphabet, commandsAlphabet, argumentsAlphabet);
		};
	};
}