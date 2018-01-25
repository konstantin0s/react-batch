import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ClassroomItem from './ClassroomItem'
import { connect } from 'react-redux'
import ClassroomEditor from './ClassroomEditor'
import './ClassroomContainer.sass'
import { GridList } from 'material-ui/GridList';
import { fetchClassrooms } from '../../actions/classrooms/fetch'

export class ClassroomsContainer extends PureComponent {
  static propTypes = {
  classrooms: PropTypes.array.isRequired,
  fetchClassrooms: PropTypes.func.isRequired,
  }


  componentWillMount() {
      this.props.fetchClassrooms()
    }

  renderClassroom(classroom, index) {
    return <ClassroomItem key={index} {...classroom} />
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
      },
    };

    return(
      <div className ="classroom wrapper">
        <header>
          <h1>Classrooms</h1>
        </header>
        <ClassroomEditor />
        <main>
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
            >
          { this.props.classrooms.map(this.renderClassroom) }
          </GridList>
          </div>

        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ classrooms }) => ({
  classrooms
})

export default connect(mapStateToProps, { fetchClassrooms })(ClassroomsContainer)
