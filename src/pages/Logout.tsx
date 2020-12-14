import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('cached_user')
    localStorage.removeItem('token')
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}