import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {

  // TODO
  // Team 6

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}