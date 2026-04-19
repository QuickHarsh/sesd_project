import { Navigate } from "react-router-dom";

export function PublicRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
