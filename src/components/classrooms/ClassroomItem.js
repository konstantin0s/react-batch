// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './ClassroomItem.sass'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'


class ClassroomItem extends PureComponent {
  static propTypes = {
    batchNo: PropTypes.number.isRequired,
    startAt: PropTypes.date,
    endAt: PropTypes.date
  }

  render() {
    const { _id, batchNo, startAt, endAt } = this.props
    // const categories = { vegan, vegetarian, pescatarian }

    return(
      <article className="ClassroomItem">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${photo || PLACEHOLDER })` }} />

          <h1>
            <Link to={`/classrooms/${_id}`}>
              <p> Classroom: {batchNo} </p>
            </Link>
          </h1>

          // <ul className="categories">
          //   <RecipeCategory { ...categories } />
          // </ul>
        </header>
        <div>
            <label><p>Starts at: {startAt}</p></label>
            <label><p>Ends at: {endAt}</p></label>
        </div>
     </article>
    )
  }
}

export default connect(null, mapDispatchToProps)(ClassroomItem)
