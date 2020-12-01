import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { Header, Books } from 'components';
import './App.css';

const App = () => {
  return (
    <div className="container-wrapper">
      <Header />
      <Switch>
        <Route path='/books/:title' component={Books} />
        <Route path='/'/>
      </Switch>
    </div>
  );
}

export default App;