import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const USER_KEY = "joblearn_user";
  const COURSE_KEY = "joblearn_courses";

  /* ================= LOAD FROM STORAGE ================= */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_KEY);
      const storedCourses = localStorage.getItem(COURSE_KEY);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (storedCourses) {
        setEnrolledCourses(JSON.parse(storedCourses));
      }
    } catch (err) {
      console.error("Auth storage error:", err);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(COURSE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ================= LOGIN ================= */
  const login = (email) => {
    const userData = {
      id: Date.now(),
      email,
      role: "user",        // admin later
      verified: true,      // OTP verified later
    };

    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setUser(null);
    setEnrolledCourses([]);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(COURSE_KEY);
  };

  /* ================= ENROLL COURSE ================= */
  const enrollCourse = (course) => {
    if (!course || !course.id) return;

    const exists = enrolledCourses.some(
      (c) => c.id === course.id
    );

    if (!exists) {
      const updatedCourses = [...enrolledCourses, { ...course, progress: 0 }];
      setEnrolledCourses(updatedCourses);
      localStorage.setItem(COURSE_KEY, JSON.stringify(updatedCourses));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        enrolledCourses,
        enrollCourse,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
