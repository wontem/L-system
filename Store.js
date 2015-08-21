export default class Store {
	constructor (reducer, onChange) {
		this.reducer = reducer;
		this.onChange = onChange || function () {};

		this.dispatch({
			type: 'init',
		});
	}

	get state () {
		return this._state;
	}

	set state (state) {
		if (state !== this._state) {
			let [prevState, newState] = [this._state || {}, state];
			this._state = newState;
			this.onChange(newState, prevState);
		}
	}

	dispatch (action) {
		this.state = this.reducer(this.state, action);
	}
};