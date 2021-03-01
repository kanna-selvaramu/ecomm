import logo from './logo.svg';
import './App.css';
import './App-mob.css';
import firebase from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import "firebase/auth";
import {  BrowserRouter as Router, Switch , Route } from 'react-router-dom';
import { useReducer, useState } from 'react';
import { UserContext } from "./context/UserContext";
import SignIn from './pages/SignIn';
import ProductList from './pages/ProductList';
import { cartReducer } from './context/reducer';
import Cart from './pages/Cart';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [ user, setUser ] = useState(localStorage.getItem("user"));
  let cart_init = 0; 
  if(localStorage.getItem("cartData") !== null) {
    let arr = JSON.parse(localStorage.getItem("cartData")); 
    cart_init = arr.reduce((a,b) => a + b.atcQty, 0);
  }
  const [ cart_count , dispatch ] = useReducer(cartReducer, cart_init);

  return (
    <div className="App">
      <UserContext.Provider value = {{ user, setUser , cart_count , dispatch}}>
        <Router>
          <Switch>
            <Route path = "/" exact> <SignIn /> </Route>
            <Route path = "/allproducts" exact> <ProductList /> </Route>
            <Route path = "/cart" exact> <Cart /> </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;