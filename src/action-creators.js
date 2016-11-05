export function getImages() {
	return {
		type: 'GET_IMAGES'
	}
}

export function uploadImage() {
	return {
		type: 'UPLOAD_IMAGE'
	}
}

export function postImage() {
	return {
		type: 'POST_IMAGE'
	}
}

export function setCaption(caption) {
	return {
		type: 'SET_CAPTION',
		payload: caption
	}
}

export function setFilters(filters) {
	return {
		type: 'SET_FILTERS',
		payload: filters
	}
}
