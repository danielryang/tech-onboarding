/* eslint-disable */
import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { setPersistence, getAuth, inMemoryPersistence } from "firebase/auth";
import {
  useLogin,
  LoadingScreen,
  AuthProvider,
  Header,
  HeaderItem,
  Footer,
} from "@hex-labs/core";

import UserData from './components/UserData';

// a little bee ascii art
// const art =
//   ".' '.                             buzz buzz\n.        .   .           (__\\ \n .         .         . -{{_(|8)\n   ' .  . ' ' .  . '     (__/";

// Initialized the Firebase app through the credentials provided
export const app = initializeApp({
  apiKey: "AIzaSyB6-uF9OFtITWqFMqrvNiPVmBODAZ_IBXk",
  authDomain: "auth.hexlabs.org",
});

// Sets the Firebase persistence to in memory since we use cookies for session
// management. These cookies are set by the backend on login/logout.
setPersistence(getAuth(app), inMemoryPersistence);

// By default sends axios requests with user session cookies so that the backend
// can verify the user's identity.
axios.defaults.withCredentials = true;

export const App = () => {
  // Retrieves the user's login state. This hook will also make requests to log
  // the user in
  const [loading, loggedIn] = useLogin(app);

  // If loading, show a loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  // If the user is not logged in, redirect to the login frontend with a redirect
  // param so that the user can login and come back to the page they were on.
  if (!loggedIn) {
    // Strip any stale idToken and encode the redirect so failed logins don't
    // keep stacking "?idToken=..." onto the URL (which ends in a 431 error).
    const redirectUrl = new URL(window.location.href);
    redirectUrl.searchParams.delete("idToken");
    window.location.href = `https://login.hexlabs.org?redirect=${encodeURIComponent(redirectUrl.toString())}`;
    return <LoadingScreen />;
  }

  // Sets up the AuthProvider so that any part of the application can use the
  // useAuth hook to retrieve the user's login details.
  return (
    <AuthProvider app={app}>

      {/* HexLabs header shown at the top of every page; each HeaderItem is a nav link */}
      <Header>
        <HeaderItem>
          <Link to="/">Users</Link>
        </HeaderItem>
      </Header>

      {/* Setting up our React Router to route to all the different pages we may have */}
      <Routes>
        <Route path="/" element={<UserData />} />
      </Routes>

      {/* HexLabs footer shown at the bottom of every page */}
      <Footer />

    </AuthProvider>
  );
};

export default App;