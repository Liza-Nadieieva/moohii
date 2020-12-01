import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './styles.less'

export const AutocompleteBooks = (props) => {
  const { books } = props
  return (
    <div>
      {books.autocompleteBooks && books.autocompleteBooks.length &&
        <div className='wrapper'>
          <ul>
            {books.autocompleteBooks.map(item =>
              <Link to={`/books/${item.title}`} key={item.id}>
                <li className='wrapper_link'>
                  {item.title}
                </li>
              </Link>
            )}
          </ul>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    searchText: state.searchText
  }
}

export default connect(mapStateToProps)(AutocompleteBooks);
