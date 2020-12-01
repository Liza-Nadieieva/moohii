import React, { useEffect }from 'react';
import { connect } from 'react-redux';
import './styles.less';

export const Books = (props) => {
  useEffect(() => {
    // TODO make work on each redirect
    props.clearAutocomplete()
    props.requestBooksByTitle(props.match.params.title)
  }, [])

  const { searchBooks } = props.books
  return(
    <div className='container'>
      {searchBooks && searchBooks.map(item =>
        <div key={item.id} className='block'>
          <img className='block_img' src={item.image_url} alt="" /><br/>
          <span>{item.title}</span><br/>
          <span>{item.author}</span>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    books: state.books
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestBooksByTitle: (text) => {
      let action = {type:'FETCH_BOOKS', searchText: text}
      dispatch(action);
    },
    clearAutocomplete: () => {
      let action = {type:'CLEAR_AUTOCOMPLETE'}
      dispatch(action);
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
