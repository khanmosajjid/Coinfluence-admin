// App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './Login';
import Upload from './Upload';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/upload" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute
              authenticated={authenticated}
              component={<Upload onLogout={handleLogout} />}
            />
          }
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const PrivateRoute = ({ component, authenticated }) => {
  return authenticated ? component : <Navigate to="/login" />;
};

export default App;
