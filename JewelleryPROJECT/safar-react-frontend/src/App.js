import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import { Home } from './components/Home';
import Login from './components/Login';
import { SignUp } from './components/SignUp';
import { AdminPrivateRoute, PrivateRoute } from './components/PrivateRoute';
import { RedirectIfLoggedIn } from './components/RedirectIfLoggedIn';
import { AdminLogin } from './components/AdminLogin';
import { AdminRedirectIfLoggedIn } from './components/AdminRedirectIfLoggedIn';
import { UsersList } from './components/UserDetails';
import { Footer } from './components/Footer';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs'
import Blogger from './components/Blogger';
import BloggerRegistration from './components/BloggerRegistration';
import BloggerProfile from './components/BloggerProfile';
import BloggerList from './components/BloggerList';
import Profile from './components/Profile';
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

import { isAuthenticated, isAdmin, isBlogger } from './utils/TokenUtil';
import UpdateLog from './components/updateLog';
import AdminProfile from './components/AdminProfile';


export const App = () => {

  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    // Check if the consent has been given
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    if (consentGiven) {
      setShowCookieConsent(false);
    }
  }, []);

  const handleCookieConsent = () => {
    // Set the consent flag in local storage
    localStorage.setItem('cookieConsentGiven', 'true');
    setShowCookieConsent(false);
  };


  return (
    <BrowserRouter>

      {isAdmin() ? <AdminNavbar title={"Admin"} /> : isBlogger() ? <CustomNavbar title={"Blogger"} /> : <CustomNavbar title={"User"} />}

      <section className="routing-section">
        <Routes>
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

          {isAdmin() &&
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





        </Routes>
      </section>

      {showCookieConsent && (
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
      )}

      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
