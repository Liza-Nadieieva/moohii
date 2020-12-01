import {
  BOOKS_AUTOCOMPLETE_SUCCESS,
  FETCH_BOOKS_SUCCESS,
  CLEAR_AUTOCOMPLETE
} from './ducks.js';

let initial_state = {
  autocompleteBooks: null,
  currentBook: null
};

const BooksReducer = (state = initial_state, action) => {
  switch(action.type){
    case BOOKS_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        autocompleteBooks: action.books
      }
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        searchBooks: action.books
      }
    case CLEAR_AUTOCOMPLETE:
      return {
        ...state,
        autocompleteBooks: null
      }
    default: return state;
  }
}

export default BooksReducer;
