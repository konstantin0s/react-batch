// src/App.js
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './styles/theme'
import Navigation from './components/UI/Navigation'
import Routes from './routes'
import ClassroomContainer from './components/classrooms/ClassroomContainer'


const classrooms = [
  {
  "batchNr": "12",
  "startAt": "02/02/2018",
  "endAt": "03/03/2018"
},
{
  "batchNr": "22",
  "startAt": "04/04/2018",
  "endAt": "04/04/2018"
},
{
  "batchNr": "33",
  "startAt": "01/01/2018",
  "endAt": "02/02/2018"
}
]

class App extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { muiTheme }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Navigation />
          <Routes />
           <ClassroomContainer classrooms={ classrooms } />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
