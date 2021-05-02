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
import ContactScreen from './screens/ContactScreen'
import FocusArea from './components/FocusArea'
import bg1 from './assets/bg1.jpg'
import UserListScreen from './screens/admin/UserListScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import CreateFacultyProfile from './screens/admin/CreateFacultyProfile'
import EditUserScreen from './screens/EditUserScreen'
import VisitorMessageScreen from './screens/admin/VisitorMessageScreen'
import EditProfileScreen from './screens/EditProfileScreen'
import CreateUserScreen from './screens/admin/CreateUserScreen'


function App() {
    return (
        <Router>
            <main style={{ backgroundImage: `url(${bg1})` }} >
                <div id='content-wrap' >
                    <Header />
                    <Container>
                        <Route exact path='/' component={HomeScreen} />
                        <Route exact path='/login' component={LoginScreen} />
                        <Route exact path='/register' component={RegisterScreen} />
                        <Route exact path='/faculty' component={FacultyScreen} />
                        <Route exact path='/faculty/:id' component={FacultyDetailsScreen} />
                        <Route exact path='/publications' component={PublicationScreen} />
                        <Route exact path='/noticeboard' component={NoticeScreen} />
                        <Route exact path='/contact' component={ContactScreen} />
                        <Route exact path='/profile' component={ProfileScreen} />
                        <Route exact path='/admin/users/profiles/:userId' component={ProfileScreen} />
                        <Route exact path='/profile/:userId/create-profile' component={CreateFacultyProfile} />
                        <Route exact path='/admin/notice' component={NoticeScreen} />
                        <Route exact path='/admin/visitormessages' component={VisitorMessageScreen} />
                        <Route exact path='/admin/users' component={UserListScreen} />
                        <Route exact path='/admin/users/:id/edit' component={EditUserScreen} />
                        <Route exact path='/admin/users/profiles/:id/edit' component={EditProfileScreen} />
                        <Route exact path='/admin/users/create-user' component={CreateUserScreen} />

                    </Container>
                    <Route exact path='/focusarea' component={FocusArea} />
                </div>
                <Footer />
            </main>
        </Router>
    )
}

export default App
