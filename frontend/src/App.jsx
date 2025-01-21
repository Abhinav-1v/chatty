import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { Useauthstore } from './store/useauthstore';
import {Loader} from 'lucide-react';
import {Toaster} from 'react-hot-toast';
import { Usethemestore } from './store/usthemestore';
import SplashCursor from './components/splashcursor';

const App = () => {
  const{ authuser,checkauthfun ,isCheckingAuth,onlineUsers}=Useauthstore();
  const {theme}=Usethemestore();
  useEffect(()=>{
    checkauthfun();
  },[checkauthfun]);

  if (isCheckingAuth && !authuser) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        <SplashCursor/>
        <Loader className='size-10 animate-spin' />
        <p className='mt-4 text-center text-gray-600'>
          It might take some time to start on the first attempt due to server inactivity.
        </p>
      </div>
    );
  }
    return (
    <div data-theme={theme}>
      <Router>
      <Navbar></Navbar>
        <Routes>
          <Route path='/' element={authuser?<Homepage/>:<Navigate to="/login"    />}/>
          <Route path='/signup' element={!authuser?<SignUpPage/>:<Navigate to='/' /> }/>
          <Route path='/login' element={!authuser?<LogInPage/>:<Navigate to='/'  />}/>
          <Route path='/settings' element={<SettingsPage/>} />
          <Route path='/profile' element={authuser?<ProfilePage/>:<Navigate to="/login"/>}/>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  )
}

export default App