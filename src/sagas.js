import {
	takeLatest,
	delay
} from 'redux-saga';

import {
	put,
	select
} from 'redux-saga/effects';

const FILESTACK_URL = 'https://process.filestackapi.com/';

const getFromServer = () => {
	return fetch('/image')
		.then(response => response.json());
}

const postToServer = url => {
  return fetch('/image', {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(url)
  })
  .then(response => response.json());
}

const pick = () => {
   return new Promise(function (resolve, reject) {
    filepicker.pick (
      {
        mimetype: 'image/*',
        container: 'modal',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER'
      },
      function (Blob) {
        console.log(JSON.stringify(Blob));
        const handler = Blob.url.substring(Blob.url.lastIndexOf('/') + 1);
        resolve(handler);
      },
      function (FPError) {
        console.log(FPError.toString());
        reject(FPError.toString());
      }
    );
  });
}

function* loadImages () {
  try {
    yield delay(1000);
  	const imageList = yield getFromServer();
  	yield put({ type: 'GET_IMAGES_SUCCESS', payload: imageList });
  } catch (error) {
  	yield put({ type: 'GET_IMAGES_FAILURE' });
  }
}

function* postImage () {
  try {
    yield delay(1000);
    const state = yield select();
    const url = FILESTACK_URL + state.get('upload').get('filters') + state.get('upload').get('handle');
    const result = yield postToServer({ url });
    yield put({ type: 'POST_IMAGE_SUCCESS' });
  } catch (error) {
    yield put({ type: 'POST_IMAGE_FAILURE' });
  }
}

function* uploadImage () {
  try {
    const upload = yield pick();
    yield put({ type: 'UPLOAD_IMAGE_SUCCESS', payload: upload });
  } catch (error) {
    yield put({ type: 'UPLOAD_IMAGE_FAILURE' });
  }
}

function* watchGetImages () {
  yield takeLatest('GET_IMAGES', loadImages);
}

function* watchPostImage () {
  yield takeLatest('POST_IMAGE', postImage);
}

function* watchFilestack () {
  yield takeLatest('UPLOAD_IMAGE', uploadImage);
}

export default function* rootSaga () {
  yield [
    watchGetImages(),
    watchPostImage(),
    watchFilestack()
  ]
}
