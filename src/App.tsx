import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import oauth from './datas/oauth'

import Home from './pages/Home'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import Redirecting from './pages/Redirecting'
import Logout from './pages/Logout'


import Navibar from './components/Navibar'
import Footer from './components/Footer'
import DashboardRoute from './components/DashboardRoute'

import { default as DashboardServers } from './pages/dashboard/Servers'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" render={() => <Redirecting to={oauth.discord_oauth2} />} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/auth" component={Auth} />
          <Route>
            <Navibar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/servers" component={DashboardServers} />
              <Route path="/dashboard/:serverid(\d+)" component={DashboardRoute} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
