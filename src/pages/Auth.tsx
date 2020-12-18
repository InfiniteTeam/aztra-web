import React from 'react'
import api from '../datas/api'
import axios from 'axios'
import { Location } from 'history'
import { Redirect } from 'react-router-dom'

export interface AuthProps {
  readonly location: Location
}

export interface AuthState {
  done: boolean;
}

export default class Auth extends React.Component<AuthProps, AuthState> {
  state: AuthState = {
    done: false
  }

  ProcessAuth = async () => {
    var code = new URLSearchParams(this.props.location.search).get('code')
    process.env.NODE_ENV === "development" && localStorage.setItem('authcode', code!)
    await axios.get(`${api}/oauth2/token`, {
      params: {
        code: code
      }
    })
      .then(res => {
        localStorage.setItem('token', res.data.access_token)
        this.setState({ done: true })
      })
      .catch(e => {
        localStorage.removeItem('token')
        console.error(e)
      })
  }

  componentDidMount() {
    this.ProcessAuth()
  }

  render() {
    return this.state.done && <Redirect to={localStorage.getItem('loginFrom') || "/"} />
  }
}