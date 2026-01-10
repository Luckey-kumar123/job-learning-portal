import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/* ================== LAZY PAGES ================== */
const Home = lazy(() => import("../pages/Home"));
const Courses = lazy(() => import("../pages/Courses"));
const Jobs = lazy(() => import("../pages/Jobs"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const VerifyOtp = lazy(() => import("../pages/VerifyOtp"));
const NotFound = lazy(() => import("../pages/NotFound"));

const CourseDetails = lazy(() => import("../pages/CoursePage"));
const CourseLearn = lazy(() => import("../pages/CourseLearn"));

/* ================== LOADER ================== */
const LoadingFallback = () => (
  <div style={{ padding: "40px", textAlign: "center" }}>
    <h3>Loading...</h3>
  </div>
);

/* ================== PROTECTED ROUTE ================== */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingFallback />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    user.verified === false &&
    location.pathname !== "/verify-otp"
  ) {
    return <Navigate to="/verify-otp" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

/* ================== ROUTES ================== */
function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/courses/:slug/learn" element={<CourseLearn />} />
        <Route path="/jobs" element={<Jobs />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ERRORS */}
        <Route path="/403" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
