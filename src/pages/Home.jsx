import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/home.css";

/* ================= PROFILE CARD ================= */
function ProfileCard({ user, logout, enrolledCourses, loading, darkMode, toggleDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = [
    { id: 1, message: "New course 'Advanced React' is now available!", read: false },
    { id: 2, message: "You completed 'JavaScript Basics' - Great job!", read: true },
    { id: 3, message: "Job alert: Frontend Developer position at TechCorp", read: false },
  ];

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="skeleton skeleton-avatar"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text short"></div>
      </div>
    );
  }

  return (
    <section className="home-profile">
      <div className="profile-avatar">
        {user.email.charAt(0).toUpperCase()}
      </div>

      <div className="profile-details">
        <h3>{user.name || "Student"}</h3>
        <p>{user.email}</p>

        <p className="enroll-count">
          Enrolled Courses: <strong>{enrolledCourses.length}</strong>
        </p>

        <span className="login-status">✅ Logged In</span>

        <div className="profile-actions">
          <button
            className="btn outline small"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            className="btn outline small notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
          >
            🔔 Notifications ({notifications.filter(n => !n.read).length})
          </button>
          <button
            className="logout-btn"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                logout();
              }
            }}
          >
            Logout
          </button>
        </div>

        {showNotifications && (
          <div className="notifications-dropdown">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification ${notification.read ? 'read' : 'unread'}`}>
                <p>{notification.message}</p>
                {!notification.read && <span className="unread-dot"></span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================= HERO ================= */
function HeroSection({ search, setSearch, onSearch, recentSearches, setRecentSearches }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = ["React", "Python", "Data Science", "JavaScript", "Machine Learning"];

  const handleSearch = () => {
    if (search.trim()) {
      onSearch();
      setRecentSearches(prev => [search, ...prev.filter(s => s !== search)].slice(0, 5));
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1>
          Build Skills. <br />
          Get Hired. <br />
          <span>Grow Your Career 🚀</span>
        </h1>

        <p>
          JobLearn is a single platform to
          <strong> learn skills </strong>
          and <strong> apply for jobs </strong>
          without switching apps.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search courses or jobs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button onClick={handleSearch} aria-label="Search">🔍</button>
          {showSuggestions && (search || recentSearches.length > 0) && (
            <div className="search-suggestions">
              {search && suggestions.filter(s => s.toLowerCase().includes(search.toLowerCase())).map(suggestion => (
                <div key={suggestion} onClick={() => selectSuggestion(suggestion)} className="suggestion-item">
                  {suggestion}
                </div>
              ))}
              {recentSearches.length > 0 && (
                <>
                  <hr />
                  <div className="recent-searches">
                    <small>Recent Searches:</small>
                    {recentSearches.map((recent, index) => (
                      <div key={index} onClick={() => selectSuggestion(recent)} className="suggestion-item">
                        {recent}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="hero-buttons">
          <Link to="/courses" className="btn primary">
            Explore Courses
          </Link>
          <Link to="/jobs" className="btn outline">
            Browse Jobs
          </Link>
        </div>
      </div>

      <div className="hero-right">
        <div className="glass-card">
          <h3>🔥 Popular Skills</h3>
          <div className="skills-grid">
            {[
              "Full Stack",
              "React",
              "Node.js",
              "Python",
              "Java",
              "Data Science",
              "AI / ML",
              "Cloud (AWS)",
              "DevOps",
              "UI / UX",
            ].map((skill) => (
              <span key={skill} className="skill-tag" onClick={() => setSearch(skill)}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= PROGRESS BAR ================= */
function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      <span className="progress-text">{progress}% Complete</span>
    </div>
  );
}

/* ================= TESTIMONIALS ================= */
function Testimonials() {
  const testimonials = [
    { name: "Alice Johnson", role: "Software Engineer", text: "JobLearn helped me land my dream job in just 3 months!" },
    { name: "Bob Smith", role: "Data Analyst", text: "The courses are top-notch and the job board is incredibly useful." },
    { name: "Carol Lee", role: "UX Designer", text: "I love how everything is in one place. Highly recommend!" },
  ];

  return (
    <section className="testimonials">
      <h2>💬 What Our Students Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card glass-card">
            <p>"{testimonial.text}"</p>
            <cite>- {testimonial.name}, {testimonial.role}</cite>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= HOME ================= */
function Home() {
  const { user, logout, enrolledCourses, loading } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.body.classList.toggle('dark-mode', savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
    document.body.classList.toggle('dark-mode', newDarkMode);
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/courses?search=${encodeURIComponent(search)}`);
    }
  };

  const featuredCourses =
    enrolledCourses.length > 0
      ? enrolledCourses.slice(0, 3).map(course => ({ ...course, progress: Math.floor(Math.random() * 100) + 1 })) // Mock progress
      : [
          { id: 1, title: "React Fundamentals", progress: 75 },
          { id: 2, title: "Node.js Backend", progress: 50 },
          { id: 3, title: "Java Programming", progress: 90 },
        ];

  return (
    <main className="home">
      {/* USER PROFILE */}
      {user && (
        <ProfileCard
          user={user}
          logout={logout}
          enrolledCourses={enrolledCourses}
          loading={loading}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      {/* HERO */}
      <HeroSection
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        recentSearches={recentSearches}
        setRecentSearches={setRecentSearches}
      />

      {/* STATS */}
      <section className="stats">
        <div className="stat-box">
          <h2>10K+</h2>
          <p>👨‍🎓 Students</p>
        </div>
        <div className="stat-box">
          <h2>500+</h2>
          <p>📚 Courses</p>
        </div>
        <div className="stat-box">
          <h2>1K+</h2>
          <p>💼 Jobs</p>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="featured-courses">
        <h2>🌟 Featured Courses</h2>

        <div className="courses-grid">
          {featuredCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="course-card"
            >
              <h3>{course.title}</h3>
              <p>Start learning today</p>
              <ProgressBar progress={course.progress} />
              <div className="btn primary small">Continue Learning</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 JobLearn. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;