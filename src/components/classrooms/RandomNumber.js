import { Link } from 'react-router-dom'

class RandomNumber extends PureComponent {
  static propTypes = {
    batch: PropTypes.object,
  }

randomStudent() {
  const { classroom } = this.Props

  const green = classroom.students.filter((student) => student.evaluations[student.evaluations.length-1].color === 1)
  const yellow = classroom.students.filter((student) => student.evaluations[student.evaluations.length-1].color === 2)
  const red = classroom.students.filter((student) => student.evaluations[student.evaluations.length-1].color === 3)

const randRed = Math.floor(Math.random() * red.length)
const randYellow = Math.floor(Math.random() * yellow.length)
const randGreen = Math.floor(Math.random() * green.length)

  const randomNumber = Math.floor((Math.random() * 100) + 1)

  if (randomNumber < 51) {
                alert(`${red[randRed].name}`)
  }
  if (randomNumber > 50 && randomNumber < 84) {
    alert(`${yellow[randYellow].name}`)
  }
  if (randomNumber > 83) {
    alert(`${green[randGreen].name}`)
  }
}

render()

return (
  <div className="RandomNumber">
   <Link to={`/random-student`}
   <RaisedButton
     onClick={this.randomStudent.bind(this) }
     label="Ask Question"
     primary={true} />
   </Link>
  </div>
  )
 }
}

 const mapStateToProps = ({ currentClassroom }) => ({
   classroom: currentClassroom,
 })

 export default connect(mapStateToProps, {},RandomNumber)
