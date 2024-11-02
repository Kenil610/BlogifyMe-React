import { useState, useEffect } from 'react';
import './App.css'
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components/index';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));  // Pass userData directly to avoid extra nesting
          dispatch(login(userData));  // Pass userData directly to avoid extra nesting
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);  // Add dispatch as a dependency


  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';

  return !loading ? (
    <div>
      <div>
        {!isAuthRoute && <Header />}
        <main>
          <Outlet />
        </main>
        {!isAuthRoute && <Footer />}
      </div>
    </div>
  ) : null
}

export default App