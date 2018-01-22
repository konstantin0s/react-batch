// src/components/classrooms/CreateclassroomButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createclassroom from '../../actions/classrooms/create'

class CreateclassroomButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateclassroomButton">
        <RaisedButton
          label="Create classroom"
          primary={true}
          onClick={this.props.createclassroom}
          icon={<StarIcon />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createclassroom })(CreateclassroomButton)
