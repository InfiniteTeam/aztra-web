import React from 'react'
import api from '../datas/api'
import axios from 'axios'

export default class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      done: false
    }
  }

  ProcessAuth = async () => {
    var code = new URLSearchParams(this.props.location.search).get('code')
    localStorage.setItem('authcode', code)
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
        localStorage.setItem('token', null)
        console.error(e)
      })
  }

  async componentDidMount() {
    await this.ProcessAuth()
    !this.state.done || window.location.assign('/')
  }

  render() {
    return null
  }
}