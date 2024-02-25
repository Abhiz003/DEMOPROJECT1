import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import { Home } from './components/Home';
import Login from './components/Login';
import UserSignUp from './components/UserSignUp';
import { AdminPrivateRoute, PrivateRoute } from './components/PrivateRoute';
import { RedirectIfLoggedIn } from './components/RedirectIfLoggedIn';
import { AdminLogin } from './admin/AdminLogin';
import { AdminRedirectIfLoggedIn } from './components/AdminRedirectIfLoggedIn';
import { UsersList } from './components/UserDetails';
import { Footer } from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs'
import Blogger from './components/Blogger';
import BloggerRegistration from './components/BloggerRegistration';
import BloggerProfile from './components/BloggerProfile';
import BloggerList from './components/BloggerList';
import UserProfile from './components/UserProfile';
import AdminDashboard from './admin/AdminDashboard';
import MyBlogs from './components/MyBlogs';
import AllBlogs from './components/AllBlogs';
import EditBloggerDetails from './components/EditBloggerDetails';
import EditUserDetails from './components/EditUserDetails';
import AdminBlogs from './components/AdminBlogs';
import AddBlog from './components/AddBlog';
import Logs from './components/Logs';
import CreateLogs from './components/CreateLogs';
import AllUsers from './components/AllUsers';
import AllBloggers from './components/AllBloggers';
import TripDetails from './components/TripDetails';
import UpdateBlog from './components/UpdateBlog';
import AdminNavbar from './components/AdminNavbar';
import CustomNavbar from './components/CustomNavbar';
import UpdateLog from './components/UpdateLog';

import { isAdmin, isAuthenticated, isBlogger } from './utils/TokenUtil';
import ProfilePage from './components/ProfilePage';
import SpeechRecognitionApp from './components/SpeechRecognitionApp'

export const App = () => {


  // const [role, setRole] = useState();

  // const fetchUserRole = () => {
  //   const userRole = isAdmin() ? "admin" : isBlogger() ? "blogger" : "user";
  //   setRole(userRole);
  // }

  // useEffect(() => {
  //   fetchUserRole();
  // }, [])



  const [role, setRole] = useState();

  const fetchUserRole = () => {
    const userRole = isAdmin() ? "admin" : isBlogger() ? "blogger" : "user";
    setRole(userRole);
  }

  useEffect(() => {
    fetchUserRole();
  }, [])

  const handleRoleChange = () => {
    fetchUserRole();
  }


  return (
    <BrowserRouter>

      {/* {isAdmin() ? <AdminNavbar title={"Admin"} /> : isBlogger() ? <CustomNavbar title={"Blogger"} /> : <CustomNavbar title={"User"} />} */}

      {/* {role === "admin" && <AdminNavbar title={"Admin"} />}
      {role === "blogger" && <CustomNavbar title={"Blogger"} />}
      {role === "user" && <CustomNavbar title={"User"} />} */}


      {role === "admin" && <AdminNavbar title={"Admin"} onRoleChange={handleRoleChange}/>}
      {role === "blogger" && <CustomNavbar title={"Blogger"} onRoleChange={handleRoleChange} />}
      {role === "user" && <CustomNavbar title={"User"} onRoleChange={handleRoleChange} />}




      <section className='routing-section'>

        <Routes>
          <Route path='*' element={<Home />} />

          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />

          <Route path='/user-profile' element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path='/my-blogs/:bloggerId' element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
          <Route path='/add-blog' element={<PrivateRoute><AddBlog /></PrivateRoute>} />
          <Route path='/update-blog/:blogId' element={<PrivateRoute><UpdateBlog /></PrivateRoute>} />
          <Route path='/update-log' element={<PrivateRoute><UpdateLog /></PrivateRoute>} />

          <Route path='/edit-user-details' element={<PrivateRoute><EditUserDetails /></PrivateRoute>} />
          <Route path='/edit-blogger-details' element={<PrivateRoute><EditBloggerDetails /></PrivateRoute>} />


          <Route path='/log-in' element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
          <Route path="/blogger-register" element={<RedirectIfLoggedIn><BloggerRegistration /></RedirectIfLoggedIn>} />
          <Route path='/user-register' element={<RedirectIfLoggedIn><UserSignUp /></RedirectIfLoggedIn>} />
          <Route path='/admin-log-in' element={<AdminRedirectIfLoggedIn><AdminLogin /></AdminRedirectIfLoggedIn>} />

          <Route path='/create-logs' element={<PrivateRoute><CreateLogs /></PrivateRoute>} />
          <Route path='/my-logs' element={<Logs />} />

          <Route path='/get-blogger' element={<Blogger />} />
          <Route path='/blogger-profile' element={<PrivateRoute><BloggerProfile /></PrivateRoute>} />

          <Route path='/all-blogs' element={<AllBlogs />} />
          {/* <Route path='/my-blogs/:bloggerId' element={<PrivateRoute><MyBlogs /></PrivateRoute>} /> */}

          <Route path='/trip-details' element={<TripDetails />} />


          <Route path='/admin-dashboard' element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
          <Route path='/all-users' element={<AdminPrivateRoute><AllUsers /></AdminPrivateRoute>} />
          <Route path='/all-bloggers' element={<AllBloggers />} />

          <Route path='/users-list' element={<AdminPrivateRoute><UsersList /></AdminPrivateRoute>} />
          <Route path='/bloggers-list' element={<AdminPrivateRoute><BloggerList /></AdminPrivateRoute>} />

          <Route path='/admin-blogs' element={<AdminPrivateRoute><AdminBlogs /> </AdminPrivateRoute>} />
          <Route path='/admin/add-blog' element={<AdminPrivateRoute><AddBlog /> </AdminPrivateRoute>} />

          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about-us' element={<AboutUs />} />




          <Route path='/profile-page/:bloggerId' element={<ProfilePage />} />
          <Route path='/speech-recognition' element={<SpeechRecognitionApp />} />



        </Routes>

      </section>

      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;

































{/* const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    if (consentGiven) {
      setShowCookieConsent(false);
    }
  }, []);

  const handleCookieConsent = () => {
      localStorage.setItem('cookieConsentGiven', 'true');
      setShowCookieConsent(false);
  }; */}

{/* {showCookieConsent && (
  <CookieConsent
    debug={true}
    location='bottom'
    style={{ background: '#9E9E9E', color: '#000', textAlign: 'center' }}
    buttonStyle={{
      color: '#000',
      background: '#fff',
      fontSize: '14px',
      padding: '8px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
    }}
    onAccept={handleCookieConsent}
  >
    <p style={{ fontSize: '18px' }}>
      This website uses cookies to enhance your experience. By continuing to use this site, you consent to our use of cookies.
      Cookies here are like sidekicks for your online adventures, helping your browser navigate the vast digital universe!
    </p>
  </CookieConsent>
)} */}




{/* <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/all-bloggers' element={<AllBloggers />} />
          <Route path='/all-blogs' element={<AllBlogs />} >
            <Route path='logs' element={<Logs />} >
              <Route path='trip-details' element={<TripDetails />} />

            </Route>
          </Route>
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/about-us' element={<AboutUs />} />

          {isAuthenticated()
            ? <>
              <Route path='/user-profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='/edit-user-details' element={<EditUserDetails />} />
              <Route path='/blogger-profile' element={<PrivateRoute><BloggerProfile /></PrivateRoute>} />
              <Route path='/edit-blogger-details' element={<EditBloggerDetails />} />
              <Route path='/my-blogs' element={<PrivateRoute><MyBlogs /></PrivateRoute>} >
                <Route path='logs' element={<Logs />} />
                <Route path='add-blog' element={<AddBlog />} />
                <Route path='update-blog/:blogId' element={<PrivateRoute><UpdateBlog /></PrivateRoute>} />
                <Route path='update-log' element={<PrivateRoute><UpdateLog /></PrivateRoute>} />

                <Route path='create-logs' element={<CreateLogs />} />
              </Route>

            </> : <>

              <Route path='/log-in' element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
              <Route path="/blogger-signup" element={<BloggerRegistration />} />
              <Route path='/user-signup' element={<SignUp />} />
            </>}

          {/* <Route path="/blogger-signup" element={<BloggerRegistration />} />
          <Route path='/user-signup' element={<SignUp />} />

          <Route path='/admin-log-in' element={<AdminRedirectIfLoggedIn><AdminLogin /></AdminRedirectIfLoggedIn>} />
          <Route path='/log-in' element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />



          <Route path='/user-profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/edit-user-details' element={<EditUserDetails />} />

          <Route path='/get-blogger' element={<Blogger />} />
          <Route path='/blogger-profile' element={<PrivateRoute><BloggerProfile /></PrivateRoute>} />
          <Route path='/edit-blogger-details' element={<EditBloggerDetails />} /> 

          <Route path='/my-blogs' element={<PrivateRoute><MyBlogs /></PrivateRoute>} >
            <Route path='logs' element={<Logs />} />
            <Route path='add-blog' element={<PrivateRoute><AddBlog /></PrivateRoute>} />
            <Route path='update-blog/:blogId' element={<PrivateRoute><UpdateBlog /></PrivateRoute>} />
            <Route path='update-log' element={<PrivateRoute><UpdateLog /></PrivateRoute>} />

            <Route path='create-logs' element={<CreateLogs />} />  
          </Route>*/}

{/*{isAdmin() &&
            <Route path='/admin' element={<AdminPrivateRoute />}>
              <Route path='admin-dashboard' element={<AdminDashboard />}>
                <Route path='all-users' element={<AllUsers />} />
                <Route path='users-list' element={<UsersList />} />
                <Route path='bloggers-list' element={<BloggerList />} />
                <Route path='admin-blogs' element={<AdminBlogs />} />
                <Route path='add-blog' element={<AddBlog />} />
              </Route>
              <Route path='admin-profile' element={<AdminProfile />} />
            </Route>
          }

        </Routes> */}





