import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navbar from './components/common/Navbar';
import OpenRoute from './components/Auth/OpenRoute';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmails from './pages/VerifyEmails';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './components/dashboard/MyProfile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/Auth/PrivateRoute';
import ErrorPage from './pages/Error';
import Settings from './components/dashboard/Settings/Settings';
import Cart from './components/dashboard/Cart/cart';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants';
import EnrolledCourses from './components/dashboard/EnrolledCourses';
import AddCourse from './components/dashboard/AddCourse';
import MyCourses from './components/dashboard/MyCourses';
import EditCourse from './components/dashboard/EditCourse/EditCourse';
import Explore from './pages/Explore';
import CourseDetails from './pages/CourseDetails';

function App() {
  const {user} = useSelector( (state) => state.profile)

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    

    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* catalog /explore */}
      <Route path="catalog/:catalogName" element={<Explore/>}/>
      <Route path="courses/:courseId" element={<CourseDetails/>} />
      <Route path="/error" element={<Error/>}/>
      <Route
          path="login"
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />
      <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
      <Route
          path="update-password/:userId/:token"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmails/>
            </OpenRoute>
          }
        />
      <Route
          path="about"
          element={
            <About/>
          }
        />
      <Route
          path="contact"
          element={
            <Contact/>
          }
        />
    <Route 
      element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }
    >
    <Route path='dashboard/my-profile' element={<MyProfile/>}/>
    <Route path='dashboard/Settings' element={<Settings/>}/>

    
    {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart/>} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
          <Route path='dashboard/add-course' element={<AddCourse/>} />
          </>
        )
    }
    {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path='dashboard/add-course' element={<AddCourse/>} />
          <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
          <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}  />
          </>
        )
    }
    
    </Route>


      
    <Route path='*' element={<ErrorPage/>}/>
    </Routes>

    
    </div>
  );
}

export default App;
