import React, {useEffect} from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { Navbar } from './components/navbar/Navbar';
import { useOpenFood } from './hooks/useOpenFood';
import Order from './components/orders/Orders';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Orders from './pages/Orders'
import Resume from './pages/Resume'
import { useSelector, useDispatch } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import * as userActions from './redux/user/user-actions'


function onAuthStateChange(cb, action) {
  auth.onAuthStateChanged(async (userAuth) => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot((snapShot) => {
        cb(action({ id: snapShot.id, ...snapShot.data() }));
      });
    } else {
      cb(action(null));
    }
  });
}

function App() {

  const openedFood = useOpenFood();
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubcribe = onAuthStateChange(dispatch, userActions.setCurrentUser);
    return () => {
      unsubcribe();
    };
  }, [dispatch]);

  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Order />
      <Switch>
        <Route exact path="/">
          <Home openedFood={openedFood}/>
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route exact path="/mis-ordenes">
          <Orders/>
        </Route>
        <Route exact path={`/mis-ordenes/:orderId`}>
          <Resume/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;