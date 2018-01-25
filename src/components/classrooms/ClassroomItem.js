// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './ClassroomItem.sass'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'


class ClassroomItem extends PureComponent {
  static propTypes = {
    batchNr: PropTypes.number.isRequired,
    startAt: PropTypes.date,
    endAt: PropTypes.date
  }

  render() {
    const { _id, batchNr, startAt, endAt } = this.props
    // const categories = { vegan, vegetarian, pescatarian }

    // <div className="cover"
    // style={{ backgroundImage: `url(${pic || PLACEHOLDER })` }} />
    return(
      <article className="ClassroomItem">
        <header>

          <h1>
            <Link to={`/classrooms/${_id}`}>
              <p> Classroom: {batchNr} </p>
            </Link>
          </h1>

        </header>
        <div>
            <label><p>Starts at: {startAt}</p></label>
            <label><p>Ends at: {endAt}</p></label>
        </div>
     </article>
    )
  }
}
// <ul className="categories">
//   <RecipeCategory { ...categories } />
// </ul>

export default connect(null)(ClassroomItem)
// (null, mapDispatchToProps)
