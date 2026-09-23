import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { initializeData } from './data/initialData';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BrowseItems from './pages/BrowseItems';
import ItemDetails from './pages/ItemDetails';
import ReportItem from './pages/ReportItem';
import MyItems from './pages/MyItems';
import Claims from './pages/Claims';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Support from './pages/Support';

// Components
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [theme, setTheme] = useState(() => {
    initializeData();
    const savedTheme = localStorage.getItem('lostFoundTheme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem('lostFoundTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/items" element={<BrowseItems />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/support" element={<Support />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <ReportItem />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-items"
              element={
                <ProtectedRoute>
                  <MyItems />
                </ProtectedRoute>
              }
            />
            <Route
              path="/claims"
              element={
                <ProtectedRoute>
                  <Claims />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
