import React from 'react'

interface RedirectingProps {
  to: string
}

export default class Redirecting extends React.Component<RedirectingProps> {
  render() {
    window.location.assign(this.props.to)
    return null
  }
}