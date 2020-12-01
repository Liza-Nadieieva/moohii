import { all, fork, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

const GOODREADS_API_KEY = 'qdgOxEofwBznSxpZLxvbkw';

function* masterSaga() {
  yield all([
    fork(booksSaga)
  ])
}

function* booksSaga() {
  yield takeEvery('AUTOCOMPLETE_BOOKS', booksAutocompleteSaga)
  yield takeEvery('FETCH_BOOKS', fetchBooks)
}

function* booksAutocompleteSaga(action) {
  const result = yield call(requestBooks, {text: action.searchText})
  yield put({type: 'BOOKS_AUTOCOMPLETE_SUCCESS', books: result})
}

function* fetchBooks(action) {
  const result = yield call(requestBooks, {text: action.searchText})

  yield put({type: 'FETCH_BOOKS_SUCCESS', books: result})
}

async function requestBooks({text}) {
  const params = {
    q: text,
    key: GOODREADS_API_KEY,
    'search[field]': 'title'
  }

  const url = 'https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?' + new URLSearchParams(params)

  try {
    return await axios(url)
      .then(response => (new window.DOMParser()).parseFromString(response.data, "text/xml"))
      .then(parsed_response => [...parsed_response.getElementsByTagName('best_book')])
      .then(collection_books => {
        let result = []

        collection_books.map((item) => {
          result.push({
            id: item.getElementsByTagName('id')[0].textContent,
            title: item.getElementsByTagName('title')[0].textContent,
            author: item.getElementsByTagName('author')[0].textContent,
            image_url: item.getElementsByTagName('image_url')[0].textContent
          })
        })

        return result
      })
  } catch (e) {
    return null // TODO handle proper http error statuses
  }
  // For test purposes when API isn't working
  // return [
  //   {
  //     id: 123,
  //     title: 'test book 123',
  //     author: 'blasd',
  //     image_url: 'some_url'
  //   },

  //   {
  //     id: 124,
  //     title: 'test book 124',
  //     author: 'blasd',
  //     image_url: 'some_url'
  //   }
  // ]
}

export default masterSaga;
