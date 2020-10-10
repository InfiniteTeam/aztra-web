import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
  componentDidMount() {
    localStorage.clear()
  }

  render() {
    return (
      <Redirect to="/" />
    )
  }
}