/* eslint-disable react-hooks/purity */
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { syllabusData } from "../data/syllabusData";
import "../styles/coursePage.css";

/* ================== COURSE FETCH HOOK ================== */
const useCourse = (slug) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = syllabusData.find((c) => c.slug === slug);
      if (!found) {
        setError("Course not found");
      } else {
        setCourse({
          ...found,
          instructor: found.instructor || "Expert Instructor",
          bio: found.bio || "Experienced professional with years of industry expertise.",
          trailerUrl: found.trailerUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo video
          modules: found.modules || [
            { id: 1, title: "Introduction", lessons: 5, duration: "2h" },
            { id: 2, title: "Core Concepts", lessons: 8, duration: "4h" },
            { id: 3, title: "Advanced Topics", lessons: 6, duration: "3h" },
            { id: 4, title: "Projects & Practice", lessons: 4, duration: "5h" },
          ],
          reviews: found.reviews || [
            { id: 1, user: "John Doe", rating: 5, comment: "Excellent course!", date: "2023-05-15" },
            { id: 2, user: "Jane Smith", rating: 4, comment: "Very informative.", date: "2023-06-20" },
          ],
        });
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [slug]);

  return { course, loading, error };
};

/* ================== COURSE TRAILER ================== */
const CourseTrailer = ({ trailerUrl, title }) => (
  <div className="course-trailer">
    <h3>Course Preview</h3>
    <div className="video-container">
      <iframe
        src={trailerUrl}
        title={`${title} Trailer`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

CourseTrailer.propTypes = {
  trailerUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

/* ================== INSTRUCTOR INFO ================== */
const InstructorInfo = ({ instructor, bio }) => (
  <div className="instructor-info">
    <h3>About the Instructor</h3>
    <div className="instructor-card">
      <div className="instructor-avatar">
        {instructor.charAt(0).toUpperCase()}
      </div>
      <div className="instructor-details">
        <h4>{instructor}</h4>
        <p>{bio}</p>
      </div>
    </div>
  </div>
);

InstructorInfo.propTypes = {
  instructor: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

/* ================== COURSE META ================== */
const CourseMeta = ({ duration, skills, rating, reviews, prerequisites, level, language, lastUpdated }) => (
  <div className="course-meta">
    <div className="meta-item">
      <strong>⏱ Duration</strong>
      <p>{duration}</p>
    </div>

    <div className="meta-item">
      <strong>🧠 Skills</strong>
      <p>{Array.isArray(skills) ? skills.join(", ") : skills}</p>
    </div>

    <div className="meta-item">
      <strong>⭐ Rating</strong>
      <p>{rating}/5 ({reviews} reviews)</p>
    </div>

    <div className="meta-item">
      <strong>📊 Level</strong>
      <p>{level}</p>
    </div>

    <div className="meta-item">
      <strong>🌐 Language</strong>
      <p>{language}</p>
    </div>

    <div className="meta-item">
      <strong>🔄 Last Updated</strong>
      <p>{lastUpdated}</p>
    </div>

    {prerequisites && (
      <div className="meta-item">
        <strong>✅ Prerequisites</strong>
        <p>{prerequisites}</p>
      </div>
    )}
  </div>
);

CourseMeta.propTypes = {
  duration: PropTypes.string.isRequired,
  skills: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  prerequisites: PropTypes.string,
  level: PropTypes.string,
  language: PropTypes.string,
  lastUpdated: PropTypes.string,
};

/* ================== SYLLABUS PREVIEW ================== */
const SyllabusPreview = ({ modules }) => (
  <div className="syllabus-preview">
    <h3>Course Syllabus</h3>
    <div className="modules-list">
      {modules.map((module) => (
        <div key={module.id} className="module-item">
          <h4>{module.title}</h4>
          <p>{module.lessons} lessons • {module.duration}</p>
        </div>
      ))}
    </div>
    <Link to={`/syllabus/${modules[0]?.courseSlug || 'course'}`} className="btn outline">
      View Full Syllabus
    </Link>
  </div>
);

SyllabusPreview.propTypes = {
  modules: PropTypes.array.isRequired,
};

/* ================== REVIEWS SECTION ================== */
const ReviewsSection = ({ reviews, onAddReview }) => {
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview(newReview);
    setNewReview({ rating: 5, comment: "" });
    setShowForm(false);
  };

  return (
    <div className="reviews-section">
      <h3>Student Reviews</h3>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <strong>{review.user}</strong>
              <span>⭐ {review.rating}/5</span>
              <span className="review-date">{review.date}</span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <button className="btn outline" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Write a Review"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <label>
            Rating:
            <select value={newReview.rating} onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} ⭐</option>)}
            </select>
          </label>
          <textarea
            placeholder="Share your thoughts..."
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            required
          />
          <button type="submit" className="btn primary">Submit Review</button>
        </form>
      )}
    </div>
  );
};

ReviewsSection.propTypes = {
  reviews: PropTypes.array.isRequired,
  onAddReview: PropTypes.func.isRequired,
};

/* ================== COURSE ACTIONS ================== */
const CourseActions = ({ slug, isEnrolled, progress, onEnroll, onBookmark, isBookmarked }) => {
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this course",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Course link copied to clipboard");
    }
  }, []);

  return (
    <div className="course-actions">
      {isEnrolled ? (
        <>
          <Link to={`/courses/${slug}/learn`} className="btn primary">
            Continue Learning ({progress}%)
          </Link>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      ) : (
        <button className="btn primary" onClick={onEnroll}>
          Enroll Now - $99
        </button>
      )}

      <button className="btn outline" onClick={onBookmark}>
        {isBookmarked ? "📚 Bookmarked" : "🔖 Bookmark"}
      </button>

      <Link to={`/syllabus/${slug}`} className="btn outline">
        View Syllabus
      </Link>

      <button className="btn outline" onClick={handleShare}>
        Share
      </button>
    </div>
  );
};

CourseActions.propTypes = {
  slug: PropTypes.string.isRequired,
  isEnrolled: PropTypes.bool.isRequired,
  progress: PropTypes.number,
  onEnroll: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
};

/* ================== RELATED COURSES ================== */
const RelatedCourses = ({ currentCourse, allCourses }) => {
  const related = useMemo(() => {
    if (!currentCourse) return [];
    return allCourses
      .filter(
        (c) =>
          c.slug !== currentCourse.slug &&
          c.category === currentCourse.category
      )
      .slice(0, 3);
  }, [currentCourse, allCourses]);

  if (!related.length) return null;

  return (
    <section className="related-courses">
      <h3>You Might Also Like</h3>
      <div className="related-grid">
        {related.map((c) => (
          <Link key={c.id} to={`/courses/${c.slug}`} className="related-card">
            <h4>{c.title}</h4>
            <p>{c.duration}</p>
            <span className="related-rating">⭐ {c.rating || 4.5}/5</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

RelatedCourses.propTypes = {
  currentCourse: PropTypes.object,
  allCourses: PropTypes.array.isRequired,
};

/* ================== TABBED CONTENT ================== */
const TabbedContent = ({ course, onAddReview }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "syllabus", label: "Syllabus" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="tabbed-content">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === "overview" && (
          <div>
            <CourseTrailer trailerUrl={course.trailerUrl} title={course.title} />
            <InstructorInfo instructor={course.instructor} bio={course.bio} />
          </div>
        )}
        {activeTab === "syllabus" && <SyllabusPreview modules={course.modules} />}
        {activeTab === "reviews" && <ReviewsSection reviews={course.reviews} onAddReview={onAddReview} />}
      </div>
    </div>
  );
};

TabbedContent.propTypes = {
  course: PropTypes.object.isRequired,
  onAddReview: PropTypes.func.isRequired,
};

/* ================== MAIN PAGE ================== */
function CoursePage() {
  const { slug } = useParams();
  const { course, loading, error } = useCourse(slug);
  const { enrolledCourses = [], enrollCourse } = useAuth();

  const [bookmarkedCourses, setBookmarkedCourses] = useState(
    JSON.parse(localStorage.getItem("bookmarkedCourses") || "[]")
  );

  const isEnrolled = enrolledCourses.some((c) => c.slug === slug);
  const isBookmarked = bookmarkedCourses.includes(slug);
  const progress = isEnrolled ? Math.floor(Math.random() * 100) : 0; // Demo progress

  const handleEnroll = useCallback(() => {
    enrollCourse(course);
    alert("Successfully enrolled ✅");
  }, [course, enrollCourse]);

  const handleBookmark = useCallback(() => {
    const updated = isBookmarked
      ? bookmarkedCourses.filter((s) => s !== slug)
      : [...bookmarkedCourses, slug];
    setBookmarkedCourses(updated);
    localStorage.setItem("bookmarkedCourses", JSON.stringify(updated));
  }, [bookmarkedCourses, isBookmarked, slug]);

  const handleAddReview = useCallback((newReview) => {
    // In a real app, this would send to backend
    console.log("New review:", newReview);
    alert("Review submitted! (Demo)");
  }, []);

  if (loading) return <p className="loading">Loading course...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="course-page container">
      <nav className="breadcrumb">
        <Link to="/courses">Courses</Link> / {course.title}
      </nav>

      <div className="course-header">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-desc">
          Learn this course from <b>basics to advanced</b> with structured lessons
          and real-world projects.
        </p>
      </div>

      <CourseMeta
        duration={course.duration}
        skills={course.skills}
        rating={course.rating || 4.5}
        reviews={course.reviews?.length || 120}
        prerequisites={course.prerequisites}
        level={course.level || "Intermediate"}
        language={course.language || "English"}
        lastUpdated={course.lastUpdated || "June 2023"}
      />

      <CourseActions
        slug={course.slug}
        isEnrolled={isEnrolled}
        progress={progress}
        onEnroll={handleEnroll}
        onBookmark={handleBookmark}
        isBookmarked={isBookmarked}
      />

      <TabbedContent course={course} onAddReview={handleAddReview} />

      <RelatedCourses
        currentCourse={course}
        allCourses={syllabusData}
      />
    </div>
  );
}

export default CoursePage;