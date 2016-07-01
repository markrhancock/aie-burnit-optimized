import { SET_INSTANCES, RESET_MEMORY } from './states';
import _ from 'lodash';

export default reducer = (state, action) => {
	state = _.cloneDeep(state);
	if (action.type == SET_INSTANCES) {
		state = _.merge(state, {
			instances: action.instances
		});
	}

	updateSelection(state);
	return state;
};

function updateSelection(state) {
	if (state.selected) {
		var selected = state.instances.filter(i => i.name == state.selected.name)[0] || null;
		if (!selected) {
			state.selected.invalid = true;
			state.instances.unshift(_.clone(state.selected));
		} else {
			selected.selected = true;
			state.selected = _.clone(selected);
		}
	} else if (state.instances.length > 0) {
		state.instances[0].selected = true;
		state.selected = _.clone(state.instances[0]);
	}
}