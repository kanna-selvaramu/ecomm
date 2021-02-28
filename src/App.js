import logo from './logo.svg';
import './App.css';
import './App-mob.css';
import firebase from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import "firebase/auth";
import {  BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from "./context/UserContext";
import SignIn from './pages/SignIn';
import ProductList from './pages/ProductList';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [ user, setUser ] = useState(null);
  return (
    <div className="App">
      <UserContext.Provider value = {{ user, setUser }}>
        <Router>
          <Switch>
            <Route path = "/" exact> <SignIn /> </Route>
            <Route path = "/allproducts" exact> <ProductList /> </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;