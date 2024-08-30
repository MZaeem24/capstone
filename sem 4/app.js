// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Reservations from './components/Reservations';
import Orders from './components/Orders';
import Inventory from './components/Inventory';
import Users from './components/Users';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/reservations" component={Reservations} />
          <Route path="/orders" component={Orders} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
