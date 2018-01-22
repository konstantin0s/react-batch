import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'

class Square extends PureComponent {
  render() {
    const { value } = this.props

    return (
      <Paper
        onClick={this.props.onClick}
        style={{ flex: 1, minWidth: 100, minHeight: 100, fontSize: 80, textAlign: 'center' }}
      >
        {value}
      </Paper>
    )
  }
}

export default connect()(Square)
