import {takeLatest, delay} from 'redux-saga';
import {put, select} from 'redux-saga/effects';

const FILESTACK_URL = 'https://process.filestackapi.com/';
const fetchImages = () => {
	return fetch('/image')
		.then(response => response.json())
		.then(response => {return response});
}

const postToServer = (url) => {
  return fetch('/image', {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(url)
  })
  .then(response => response.json())
  .then(response => {return response});
}

const pick = () => {
   return new Promise(function (resolve, reject) {
    filepicker.pick(
      {
        mimetype: 'image/*',
        container: 'modal',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER'
      },
      function(Blob){
        console.log(JSON.stringify(Blob));
        const handler = Blob.url.substring(Blob.url.lastIndexOf('/') + 1);
        resolve(handler);
      },
      function(FPError){
        console.log(FPError.toString());
        reject(FPError.toString());
      }
    )
  })
}

export function* loadImages() {
  try {
    yield delay(1000);
  	const imageList = yield fetchImages();
  	yield put({type: 'GET_IMAGES_SUCCESS', payload: imageList});
  } catch(error) {
  	yield put({type: 'GET_IMAGES_FAILURE'});
  } 
}

export function* postImage() {
  try {
    yield delay(1000);
    const state = yield select();
    const url = FILESTACK_URL + state.get('upload').get('filters') + state.get('upload').get('handle');
    const result = yield postToServer({url});
    yield put({type: 'POST_IMAGE_SUCCESS'});
  } catch(error) {
    yield put({type: 'POST_IMAGE_FAILURE'});
  } 
}

export function* uploadImage() {
  try {
    const upload = yield pick();
    //console.log("hereee");
    console.log(upload);
    yield put({ type: 'UPLOAD_IMAGE_SUCCESS', payload: upload });

  } catch(error) {
    yield put({type: 'UPLOAD_IMAGE_FAILURE'});
  } 

}

export function* watchGetImages() {
  yield takeLatest('GET_IMAGES', loadImages);
}

export function* watchPostImage() {
  yield takeLatest('POST_IMAGE', postImage);
}

export function* watchFilestack() {
  yield takeLatest('UPLOAD_IMAGE', uploadImage);
}

export default function* rootSaga() {
  yield [
    watchGetImages(),
    watchPostImage(),
    watchFilestack()
  ]
}