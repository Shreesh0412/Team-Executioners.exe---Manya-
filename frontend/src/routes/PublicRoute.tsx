import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicRoute({
  children,
}: Props) {

  // TODO:
  // Team 6
  // if logged in
  // return <Navigate to="/dashboard" />

  return children;
}