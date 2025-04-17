import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();
  
  if (loading) return "...loading";
  return (
    auth?.user ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace /> // login
  )
}

export default RequireAuth  