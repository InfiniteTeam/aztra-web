import React from 'react'

export default class Redirecting extends React.Component {
  render() {
    window.location.assign(this.props.to)
    return null
  }
}