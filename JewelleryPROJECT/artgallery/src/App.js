import React, {useState, useEffect} from 'react';
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
import EditBloggerDetails from './components/EditBloggerDetails';
import EditUserDetails from './components/EditUserDetails';
import AdminBlogs from './components/AdminBlogs';
import AddBlog from './components/AddBlog';
import UpdateBlogs from './components/UpdateBlog';
import Logs from './components/Logs';
import CreateLogs from './components/CreateLogs';


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
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/log-in' element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
        <Route path="/blogger-register" element={<BloggerRegistration />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/admin-log-in' element={<AdminRedirectIfLoggedIn><AdminLogin /></AdminRedirectIfLoggedIn>} />
        
        <Route path='/admin-dashboard' element={<AdminPrivateRoute><AdminDashboard /></AdminPrivateRoute>} />
        
        
        <Route path='/about-us' element={<AboutUs/>} />





        

        
        <Route path='/user-profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/edit-user-details' element={<EditUserDetails />} />

        <Route path='/get-blogger' element={<Blogger/>} />
        <Route path='/blogger-profile' element={<PrivateRoute><BloggerProfile /></PrivateRoute>} />
        <Route path='/edit-blogger-details' element={<EditBloggerDetails />} />

        <Route path='/all-blogs' element={<AllBlogs />} />
        <Route path='/my-blogs' element={<PrivateRoute><MyBlogs /></PrivateRoute>} />
        <Route path='/add-blog' element={<AddBlog /> } />

        <Route path='/my-logs' element={<Logs/>}/>
        <Route path='/create-logs' element={<CreateLogs/>}/>


        <Route path='/user-details' element={<AdminPrivateRoute><UsersList /></AdminPrivateRoute>} />
        <Route path='/blogger-list' element={<AdminPrivateRoute><BloggerList /></AdminPrivateRoute>} />
        <Route path='/admin-blogs' element={<AdminPrivateRoute><AdminBlogs /> </AdminPrivateRoute>} />
        <Route path='/admin/add-blog' element={<AdminPrivateRoute><AddBlog /> </AdminPrivateRoute>} />
        <Route path='/admin/update-blog/:id' element={<AdminPrivateRoute><UpdateBlogs /> </AdminPrivateRoute>} />
      </Routes>



      {/* <CookieConsent 
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
      </CookieConsent> */}

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
