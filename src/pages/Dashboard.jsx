// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import "../styles/dashboard.css";

/* ================== DEBOUNCE HOOK ================== */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/* ================== PROFILE HERO ================== */
const ProfileHero = React.memo(({ user, name, onEdit }) => (
  <div className="profile-hero">
    <div className="profile-avatar">
      {(user.email || "U").charAt(0).toUpperCase()}
    </div>
    <div className="profile-info">
      <h3>{name || "My Profile"}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <span className="profile-role">Student / Learner</span>
    </div>
    <button className="edit-btn" onClick={onEdit}>
      ⚙ Edit Profile
    </button>
  </div>
));

ProfileHero.propTypes = {
  user: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
};

/* ================== PROFILE SETTINGS ================== */
const ProfileSettings = ({ name, setName, user, onSave, onCancel }) => {
  const [tempName, setTempName] = useState(name);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setName(tempName);
      localStorage.setItem("profile_name", tempName);
      onSave();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="profile-settings">
      <h3>Profile Settings</h3>

      <label>Name</label>
      <input
        type="text"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
      />

      <label>Email</label>
      <input type="email" value={user.email} disabled />

      <div className="settings-actions">
        <button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

ProfileSettings.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

/* ================== DASHBOARD STATS ================== */
const DashboardStats = React.memo(({ enrolledCourses, jobApplications }) => {
  const stats = useMemo(() => [
    { label: "Enrolled Courses", value: enrolledCourses.length },
    { label: "Job Applications", value: jobApplications.length },
    { label: "Completed Lessons", value: 25 }, // demo
  ], [enrolledCourses, jobApplications]);

  return (
    <div className="dashboard-stats">
      {stats.map((s, i) => (
        <div key={i} className="stat-card">
          <h4>{s.value}</h4>
          <p>{s.label}</p>
        </div>
      ))}
    </div>
  );
});

DashboardStats.propTypes = {
  enrolledCourses: PropTypes.array.isRequired,
  jobApplications: PropTypes.array.isRequired,
};

/* ================== ENROLLED COURSES ================== */
const EnrolledCourses = ({ enrolledCourses, search, setSearch }) => {
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [enrolledCourses, search]);

  return (
    <div className="dashboard-section">
      <h3>My Enrolled Courses</h3>

      <input
        className="search-input"
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCourses.length === 0 ? (
        <p className="empty-text">No courses found.</p>
      ) : (
        <div className="course-list">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <span>Duration: {course.duration}</span>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${course.progress || 0}%` }}
                />
              </div>
              <small>{course.progress || 0}% Complete</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

EnrolledCourses.propTypes = {
  enrolledCourses: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

/* ================== DASHBOARD ================== */
function Dashboard() {
  const { user, enrolledCourses } = useAuth();
  const jobApplications = []; // backend later

  const [activeTab, setActiveTab] = useState("profile");
  const [showSettings, setShowSettings] = useState(false);
  const [courseSearch, setCourseSearch] = useState("");

  const debouncedSearch = useDebounce(courseSearch, 300);

  const [name, setName] = useState(
    localStorage.getItem("profile_name") || user?.name || ""
  );

  const handleSaveSettings = () => {
    alert("Profile updated successfully ✅");
    setShowSettings(false);
  };

  if (!user) {
    return <p className="login-warning">Please login to continue.</p>;
  }

  return (
    <div className="dashboard-page">
      <h2>My Dashboard</h2>

      <DashboardStats
        enrolledCourses={enrolledCourses}
        jobApplications={jobApplications}
      />

      <div className="dashboard-tabs">
        {["profile", "courses", "jobs"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <>
          <ProfileHero
            user={user}
            name={name}
            onEdit={() => setShowSettings(true)}
          />
          {showSettings && (
            <ProfileSettings
              name={name}
              setName={setName}
              user={user}
              onSave={handleSaveSettings}
              onCancel={() => setShowSettings(false)}
            />
          )}
        </>
      )}

      {activeTab === "courses" && (
        <EnrolledCourses
          enrolledCourses={enrolledCourses}
          search={debouncedSearch}
          setSearch={setCourseSearch}
        />
      )}

      {activeTab === "jobs" && (
        <div className="dashboard-section">
          <h3>My Job Applications</h3>
          <p className="empty-text">No job applications yet.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
