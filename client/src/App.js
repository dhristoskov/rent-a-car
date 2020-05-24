import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './styles/App.css'

import MainNav from './shared/components/Navigation/MainNav';
import LandingPage from './LandingPage/LandingPage';
import FleetPage from './Fleet/pages/FleetPage';
import OrdersPage from './Orders/pages/OrdersPage';
import FleetSearchPage from './Fleet/pages/FleetSearchPage';
import ThemeContextProvider from './shared/contexts/ThemeContext';
import AuthContextProvider from './shared/contexts/AuthContext';
import RentPage from './Rent/pages/RentPage';
import ResetForm from './User/components/ResetForm';
import ResetPage from './User/pages/ResetPage';
import PrivateRoute from './shared/components/PrivateRoute/PrivateRoute';
import Auth from './User/pages/Auth';

function App() {

  return (
    <AuthContextProvider>
      <ThemeContextProvider>
            <Router>
                  <MainNav />
                  <Switch>             
                    <Route exact path='/' component={LandingPage} />
                    <Route path='/auth/reset/:token' component={ResetForm} />
                    <Route path='/auth/reset' component={ResetPage} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/fleet/sort/:name' component={FleetSearchPage} />
                    <Route path='/fleet' component={FleetPage} />
                    <PrivateRoute path='/my-orders/:id' component={OrdersPage} />
                    <Route path='/rent/:id' component={RentPage} />
                    <Redirect to='/'/>
                  </Switch>
            </Router>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
