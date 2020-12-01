import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AutocompleteBooks } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faFacebookSquare, faInstagramSquare, faPinterestSquare } from '@fortawesome/free-brands-svg-icons' ;
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import './styles.less';

export const Header = (props) => {
  let textInput = React.createRef();

  const searchUrl = () => {
    return `/books/${textInput.current?.value}`;
  }
  return (
    <div className='header'>
      <h3 className='logo'>Test Task</h3>
      <form className='search-form'>
        <input type="text" placeholder='search' className='search-form__input' onChange={(e) => props.autocompleteBooks(e.target.value)} ref={textInput}/>
        <Link className='search-form-button' to={searchUrl} className='search-form__button'>Search</Link>
      </form>
      <div className='menu-icon'>
        <NavLink to='#'>
          <FontAwesomeIcon size="lg" icon={faTwitterSquare}/>
        </NavLink>
        <NavLink to='#'>
          <FontAwesomeIcon size="lg" icon={faFacebookSquare}/>
        </NavLink>
        <NavLink to='#'>
          <FontAwesomeIcon size="lg" icon={faInstagramSquare}/>
        </NavLink>
        <NavLink to='#'>
          <FontAwesomeIcon size="lg" icon={faPinterestSquare}/>
        </NavLink>
      </div>
      <AutocompleteBooks />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    autocompleteBooks: debounce((text) => {
      const action = {type:'AUTOCOMPLETE_BOOKS', searchText: text}
      dispatch(action);
    }, 500)
  }
}

export default connect(null, mapDispatchToProps)(Header);
