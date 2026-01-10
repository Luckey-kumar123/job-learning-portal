import { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* Global Loader */
function GlobalLoader() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h3>Loading...</h3>
    </div>
  );
}

function AppLayout() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Suspense fallback={<GlobalLoader />}>
        <AppRoutes />
      </Suspense>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AppLayout />
    </>
  );
}

export default App;
