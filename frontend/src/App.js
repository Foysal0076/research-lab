import './css/App.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import FacultyScreen from './screens/FacultyScreen'
import NoticeScreen from './screens/NoticeScreen'
import FacultyDetailsScreen from './screens/FacultyDetailsScreen'
import PublicationScreen from './screens/PublicationScreen'
import FocusArea from './components/FocusArea'
function App() {
  return (
    <Router>
      <main>
        <div id='content-wrap' >
          <Header />
          <Container>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/faculty' component={FacultyScreen} />
            <Route exact path='/faculty/:id' component={FacultyDetailsScreen} />
            <Route exact path='/publications' component={PublicationScreen} />
            <Route exact path='/noticeboard' component={NoticeScreen} />
          </Container>
            <Route exact path='/focusarea' component={FocusArea} />
        </div>
        <Footer />
      </main>
    </Router>
  )
}

export default App
