import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import "../styles/courses.css";

/* ================== DEBOUNCE ================== */
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

/* ================== COURSES DATA ================== */
const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const loadCourses = useCallback(() => {
    if (!hasMore || loading) return;

    setLoading(true);

    setTimeout(() => {
      const enrolled =
        JSON.parse(localStorage.getItem("enrolledCourses")) || [];

      const newCourses = Array.from({ length: 8 }).map((_, i) => {
        const id = (pageRef.current - 1) * 8 + i + 1;

        return {
          id,
          title: `Advanced Course ${id}`,
          slug: `advanced-${id}-course`,
          description: "Industry-ready modern development course",
          duration: `${Math.floor(Math.random() * 6) + 3} Months`,
          category: ["Frontend", "Backend", "Full Stack", "Programming"][
            Math.floor(Math.random() * 4)
          ],
          rating: (Math.random() * 2 + 3).toFixed(1),
          price: Math.random() > 0.3 ? Math.floor(Math.random() * 4000) + 999 : 0,
          instructor: `Industry Expert ${id}`,
          level: ["Beginner", "Intermediate", "Advanced"][
            Math.floor(Math.random() * 3)
          ],
          isEnrolled: enrolled.includes(id),
        };
      });

      setCourses(prev => [...prev, ...newCourses]);
      pageRef.current += 1;
      setLoading(false);

      if (pageRef.current > 6) setHasMore(false);
    }, 800);
  }, [hasMore, loading]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCourses();
  }, []);

  return { courses, setCourses, loadCourses, loading, hasMore };
};

/* ================== COURSES PAGE ================== */
export default function Courses() {
  const { courses, setCourses, loadCourses, loading, hasMore } =
    useCourses();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("courseFavorites")) || []
  );
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("courseWishlist")) || []
  );
  const [enrolledCourses, setEnrolledCourses] = useState(
    JSON.parse(localStorage.getItem("enrolledCourses")) || []
  );

  /* ================== INFINITE SCROLL (FIXED) ================== */
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        hasMore &&
        !loading
      ) {
        loadCourses();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadCourses, hasMore, loading]);

  /* ================== ENROLL + AUTO NAVIGATE ================== */
  const enrollCourse = (course) => {
    if (!enrolledCourses.includes(course.id)) {
      const updated = [...enrolledCourses, course.id];
      setEnrolledCourses(updated);
      localStorage.setItem("enrolledCourses", JSON.stringify(updated));

      setCourses(prev =>
        prev.map(c =>
          c.id === course.id ? { ...c, isEnrolled: true } : c
        )
      );
    }

    navigate(`/courses/${course.slug}`);
  };

  /* ================== FAVORITE / WISHLIST ================== */
  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("courseFavorites", JSON.stringify(updated));
  };

  const toggleWishlist = (id) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter(w => w !== id)
      : [...wishlist, id];

    setWishlist(updated);
    localStorage.setItem("courseWishlist", JSON.stringify(updated));
  };

  /* ================== SEARCH FILTER ================== */
  const filteredCourses = useMemo(() => {
    if (!debouncedSearch) return courses;

    return courses.filter(course =>
      `${course.title} ${course.description} ${course.instructor}`
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [courses, debouncedSearch]);

  return (
    <div className="courses-page">
      <h1>Explore Courses</h1>
      <p className="courses-subtitle">Learn industry-ready skills 🚀</p>

      <div className="course-search-wrapper">
        <input
          className="course-search"
          placeholder="🔍 Search courses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch("")}>
            ✖
          </button>
        )}
      </div>

      <div className="course-grid">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            isFavorite={favorites.includes(course.id)}
            isWishlisted={wishlist.includes(course.id)}
            onToggleFavorite={toggleFavorite}
            onToggleWishlist={toggleWishlist}
            onEnroll={() => enrollCourse(course)}
          />
        ))}
      </div>

      {loading && <p className="loading">Loading courses...</p>}
      {!loading && filteredCourses.length === 0 && (
        <p className="empty-state">No courses found</p>
      )}
    </div>
  );
}
