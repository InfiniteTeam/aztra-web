import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

import oauth from './datas/oauth'

import Home from './pages/Home'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import Redirecting from './pages/Redirecting'
import Logout from './pages/Logout'
import Premium from './pages/Premium'
import Praise from './pages/Praise'
import Navibar from './components/Navibar'
import Footer from './components/Footer'
import DashboardRoute from './components/DashboardRoute'
import DashboardServers from './pages/dashboard/Servers'
import DocsMain from './pages/DocsMain'

import Aztrart from './aztrart.txt'

import DocView from './pages/DocView'
import DocsRoute from './routes/DocsRoute'
import betaMD from './docs/cbt1.md'

export default class App extends Component {
  async componentDidMount() {
    if (localStorage.getItem('theme') == null) {
      localStorage.setItem('theme', 'dark')
    }

    console.log(`%c${Aztrart}`, 'color:MediumPurple')

    if (process.env.NODE_ENV === 'production') {
      let style = 'font-family: NanumSquare; font-size: 16pt;'
      console.log('\n\n\n')
      console.log('%c조심하세요!', 'color: gold; font-size: 34pt; font-weight: bold;')
      console.log('%c이 콘솔은 개발자를 위해 만들어진 것으로서, 일반적으로 여러분이 볼 일이 없는 화면입니다.\n만약 누군가가 이곳에 특정 명령을 복사하여 붙여넣을 것을 요구했다면 이는 계정 해킹 시도일 가능성이 매우 높습니다!', style)
      console.log('%c이를 무시하고 계속할 시 타인에게 당신의 Aztra 액세스 권한을 넘겨주게 될 수 있습니다!!', style)
      console.log('\n\n\n')
    }
  }

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route exact path="/login" render={() => <Redirecting to={oauth.discord_oauth2} />} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/auth" component={Auth} />
            <Route>
              <Navibar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/servers" component={DashboardServers} />
                <Route exact path="/premium" component={Premium} />
                <Route exact path="/praise" component={Praise} />
                <Route exact path="/docs" component={DocsMain} />
                {/*<Route exact path="/cbt-1" render={props => <DocView src={betaMD} {...props} />} />*/}
                <Route path="/dashboard/:serverid(\d+)" component={DashboardRoute} />
                <DocsRoute />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    )
  }
}