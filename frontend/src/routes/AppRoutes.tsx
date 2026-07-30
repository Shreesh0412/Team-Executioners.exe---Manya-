import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ROUTES from "./routeConfig";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Landing = lazy(() => import("@/pages/Landing/Landing"));

const Login = lazy(() => import("@/pages/Login/Login"));

const Register = lazy(() => import("@/pages/Register/Register"));

const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));

const Folders = lazy(() => import("@/pages/Folders/Folders"));

const Documents = lazy(() => import("@/pages/Documents/Documents"));

const Upload = lazy(() => import("@/pages/Upload/Upload"));

const Profile = lazy(() => import("@/pages/Profile/Profile"));

const Settings = lazy(() => import("@/pages/Settings/Settings"));

const NotFound = lazy(() => import("@/pages/NotFound/NotFound"));

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Suspense
        fallback={<div>Loading...</div>}
      >

        <Routes>

          <Route
            path={ROUTES.HOME}
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.REGISTER}
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.FOLDERS}
            element={
              <ProtectedRoute>
                <Folders />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.DOCUMENTS}
            element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.UPLOAD}
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.SETTINGS}
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}