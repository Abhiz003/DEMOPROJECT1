import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import AboutUs  from './components/AboutUs';
import ContactUs from './components/ContactUs'
import Blogger from './components/Blogger';
import BloggerRegistration from './components/BloggerRegistration';
import BloggerProfile from './components/BloggerProfile';
import BloggerList from './components/BloggerDetails';
import Profile from './components/Profile';
import AdminDashboard from './admin/dashboard';
import MyBlogs from './components/MyBlogs';
import AllBlogs from './components/AllBlogs';
import { DeletedUsersList } from './components/DeletedUsers';
import DeletedBloggerList from './components/DeletedBloggerList';
import EditBloggerDetails from './components/EditBloggerDetails';
import EditUserDetails from './components/EditUserDetails';
import AdminBlogs from './components/AdminBlogs';
import AddBlog from './components/AddBlog';
import UpdateBlogs from './components/UpdateExhibition';


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/log-in' element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
        <Route path="/blogger-register" element={<BloggerRegistration />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/admin-log-in' element={<AdminRedirectIfLoggedIn><AdminLogin /></AdminRedirectIfLoggedIn>} />
        
        <Route path='/admin-dashboard' element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
        <Route path='/user-details' element={<AdminPrivateRoute><UsersList /></AdminPrivateRoute>} />
        
        <Route path='/about-us' element={<AboutUs/>} />

        <Route path='/blogger-details' element={<Blogger/>} />

        <Route path='/edit-blogger-details' element={<EditBloggerDetails />} />

        <Route path='/edit-user-details' element={<EditUserDetails />} />
        <Route path='/add-blog' element={<><AddBlog /> </>} />

        <Route path='/user-profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/blogger-profile' element={<PrivateRoute><BloggerProfile /></PrivateRoute>} />
        
        <Route path='/all-blogs' element={<PrivateRoute><AllBlogs /></PrivateRoute>} />

        <Route path='/my-blogs' element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
        
        <Route path='/blogger-list' element={<AdminPrivateRoute><BloggerList /></AdminPrivateRoute>} />

        <Route path='/deleted-user-list' element={<AdminPrivateRoute><DeletedUsersList /></AdminPrivateRoute>} />

        <Route path='/deleted-blogger-list' element={<AdminPrivateRoute><DeletedBloggerList /> </AdminPrivateRoute>} />

        <Route path='/admin-blogs' element={<AdminPrivateRoute><AdminBlogs /> </AdminPrivateRoute>} />

        <Route path='/admin/add-exhibition' element={<AdminPrivateRoute><AddBlog /> </AdminPrivateRoute>} />
        
        <Route path='/admin/update-exhibition/:id' element={<AdminPrivateRoute><UpdateBlogs /> </AdminPrivateRoute>} />

      </Routes>



      <CookieConsent 
          debug={true}
          location='bottom'
          style={{background: '#9E9E9E',color:'#000', textAlign:'center' }}
          buttonStyle={{ color: '#000',
          background: '#fff',
          fontSize: '14px',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer',}}
          >
          <p style={{ fontSize: '18px' }}>
          This website uses cookies to enhance your experience. By continuing to use this site, you consent to our use of cookies.
          Cookies here are like sidekicks for your online adventures, helping your browser navigate the vast digital universe!
          </p>
      </CookieConsent>



      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
