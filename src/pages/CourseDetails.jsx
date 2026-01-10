/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import "../styles/courseDetails.css";

/* ================= HELPERS ================= */
const formatCourseTitle = (slug = "") =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

/* ================= COURSE DETAILS HOOK ================= */
const useCourseDetails = (slug) => {
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    // 🔹 Simulated API
    setTimeout(() => {
      const mockCourse = {
        slug,
        title: formatCourseTitle(slug),
        description:
          "Master this course from basics to advanced with structured lessons, real-world examples, and hands-on projects.",
        duration: "6 Months",
        level: "Beginner to Advanced",
        rating: 4.6,
        enrolled: 1250,
        recentEnrollments: 72,
        isFree: true,

        whatYouLearn: [
          "Core fundamentals",
          "Real-world implementation",
          "Industry best practices",
          "Mini & final projects",
        ],

        features: [
          "Self-paced learning",
          "Beginner friendly",
          "Hands-on projects",
          "Certificate (Coming Soon)",
        ],

        prerequisites: ["Basic computer knowledge"],

        syllabus: [
          "Introduction",
          "Core Concepts",
          "Advanced Topics",
          "Projects",
        ],

        instructor: {
          name: "John Doe",
          bio: "Senior Software Engineer with 10+ years of experience",
        },

        videoUrl: "https://example.com/preview.mp4",
      };

      setCourse(mockCourse);

      // 🔹 Enrollment simulation
      const enrolledSlugs = user?.enrolledCourses || [];
      setIsEnrolled(enrolledSlugs.includes(slug));
      setProgress(user?.progress?.[slug] || 0);

      setLoading(false);
    }, 600);
  }, [slug, user]);

  const enroll = useCallback(() => {
    setIsEnrolled(true);
    setProgress(0);
    alert("🎉 Successfully enrolled!");
  }, []);

  return { course, loading, isEnrolled, progress, enroll };
};

/* ================= COMPONENTS ================= */

const CourseHeader = React.memo(
  ({ title, description, rating, enrolled, recentEnrollments, level, isFree }) => (
    <div className="course-header">
      <nav className="breadcrumb">
        <Link to="/courses">Courses</Link>
        <span>›</span>
        <span>{title}</span>
      </nav>

      <h1 className="course-title">{title}</h1>

      <div className="course-badges">
        <span className="badge level">{level}</span>
        {isFree && <span className="badge free">FREE</span>}
        <span className="badge trending">Trending</span>
      </div>

      <p className="course-desc">{description}</p>

      <div className="course-meta">
        ⭐ {rating} Rating
        <span>•</span>
        👨‍🎓 {enrolled.toLocaleString()} Learners
        <span>•</span>
        🔥 {recentEnrollments} joined this week
      </div>
    </div>
  )
);

CourseHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  enrolled: PropTypes.number.isRequired,
  recentEnrollments: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  isFree: PropTypes.bool.isRequired,
};

const ProgressIndicator = ({ progress }) => (
  <div className="progress-indicator">
    <h4>Your Progress</h4>
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      />
    </div>
    <p>{progress}% completed</p>
  </div>
);

ProgressIndicator.propTypes = {
  progress: PropTypes.number.isRequired,
};

/* ================= MAIN PAGE ================= */
export default function CourseDetails() {
  const { slug } = useParams();
  const { course, loading, isEnrolled, progress, enroll } =
    useCourseDetails(slug);

  if (loading) return <div className="loading">Loading course...</div>;
  if (!course) return <div className="error">Course not found</div>;

  return (
    <div className="course-details-container">
      <CourseHeader
        title={course.title}
        description={course.description}
        rating={course.rating}
        enrolled={course.enrolled}
        recentEnrollments={course.recentEnrollments}
        level={course.level}
        isFree={course.isFree}
      />

      {isEnrolled && <ProgressIndicator progress={progress} />}

      <section className="course-info">
        <div>
          <h4>✔ What you’ll learn</h4>
          <ul>
            {course.whatYouLearn.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>✔ Course features</h4>
          <ul>
            {course.features.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>✔ Prerequisites</h4>
          <ul>
            {course.prerequisites.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="course-actions">
        {isEnrolled ? (
          <Link to={`/courses/${slug}/learn`} className="btn primary">
            Continue Learning
          </Link>
        ) : (
          <button onClick={enroll} className="btn primary">
            Enroll Now
          </button>
        )}

        <Link to={`/syllabus/${slug}`} className="btn outline">
          View Syllabus
        </Link>
      </div>
    </div>
  );
}
