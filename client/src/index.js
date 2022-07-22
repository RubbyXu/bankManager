import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import { createStore, compose } from 'redux';

import { Provider } from 'react-redux';

import './index.css';
import reducers from './store/reducers';
import Register from './components/Register';
import Home from './components/Home';
import Admin from './components/Admin';

export const store = createStore(
  reducers,
  // compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/' component={Register} />
        <Route exact path='/admin' component={Admin} />
      </Switch>

    </Router>
  </Provider>
);


