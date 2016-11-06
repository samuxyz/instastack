import {
	Map,
	List
} from 'immutable';

const INITIAL_STATE = Map({
	imageList: List([]),
	view: Map({
		isLoading: false
	}),
	upload: Map({
		handle: '',
		filters: '',
	})
});

export default function (state = INITIAL_STATE, action) {
	switch(action.type) {
		case 'GET_IMAGES':
				return state.merge({
					view: {
						isLoading: true
					}
				});
		case 'GET_IMAGES_SUCCESS':
			return state.merge({
				imageList: action.payload,
				view: {
					isLoading: false
				}
			});
		case 'UPLOAD_IMAGE_SUCCESS':
			return state.updateIn(
				['upload', 'handle'],
				'',
				handle => action.payload
			);
		case 'POST_IMAGE':
			return state.merge({
				view: {
					isLoading: true
				}
			});
		case 'POST_IMAGE_SUCCESS':
			return state.merge({
				upload: {
					handle: '',
					filters: ''
				},
				view: {
					isLoading: false
				}
			});
		case 'SET_FILTERS':
			return state.updateIn(
				['upload', 'filters'],
				'',
				filter => action.payload
			);
		default: return state;
	}
}
