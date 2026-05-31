import './css/App.css'
import Favorites from './pages/Favorites'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDetail from './pages/MovieDetail'
import { MovieProvider } from './contexts/MovieContext'
import { AuthProvider } from './contexts/AuthContext'
import ForgotPassword from './pages/ForgetPassword'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './contexts/AuthContext'

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      } />
      <Route path="/movie/:id" element={
        <ProtectedRoute>
          <MovieDetail />
        </ProtectedRoute>
      } />
      <Route path="/login" element={
        currentUser ? <Navigate to="/" /> : <Login />
      } />
      <Route path="/register" element={
        currentUser ? <Navigate to="/" /> : <Register />
      } />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;