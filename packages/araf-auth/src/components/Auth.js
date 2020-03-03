import React, { useEffect, useState, useRef } from "react";
import { useScript } from "../hooks/useScript";

// Based on
// https://developers.google.com/identity/protocols/OAuth2UserAgent

export const Auth = () => {
  const SCOPE = "https://www.googleapis.com/auth/userinfo.profile";

  const GoogleAuth = useRef(null);

  const [state, setState] = useState({
    isAuthorized: false,
    user: {}
  });

  const [loaded, error] = useScript("https://apis.google.com/js/api.js");

  const setSigninStatus = isSignedIn => {
    const user = GoogleAuth.current.currentUser.get();
    const isAuthorized = user.hasGrantedScopes(SCOPE);

    if (isAuthorized) {
      setState({
        isAuthorized: true,
        user
      });
    } else {
      setState({
        isAuthorized: false,
        user: {}
      });
    }
  };

  const handleAuthClick = () => {
    const isSignedIn = GoogleAuth?.current?.isSignedIn?.get();

    if (isSignedIn) {
      // User is authorized and has clicked "Sign out" button.
      GoogleAuth.current.signOut();
    } else {
      // User is not signed in. Start Google auth flow.
      GoogleAuth.current.signIn();
    }
  };

  useEffect(() => {
    const updateSigninStatus = isSignedIn => {
      setSigninStatus(isSignedIn);
    };

    if (loaded && window.gapi) {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_AUTH_API_KEY,
            clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
            scope: SCOPE
          })
          .then(() => {
            GoogleAuth.current = window.gapi.auth2.getAuthInstance();
            GoogleAuth.current.isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(GoogleAuth.current.isSignedIn.get());
          });
      });
    }
  }, [loaded]);

  return (
    <div>
      {loaded && window.gapi ? (
        <>
          <p>{state.isAuthorized ? "Authorised" : "Unauthorised"}</p>
          <button onClick={handleAuthClick}>
            {state.isAuthorized ? "Log out" : "Log in"}
          </button>

          {state.user?.Qt?.Ad && <p>{state.user?.Qt?.Ad}</p>}
        </>
      ) : (
        <div>Loading</div>
      )}
      {error && <div>Error</div>}
    </div>
  );
};
