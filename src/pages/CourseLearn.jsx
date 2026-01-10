import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types"; // Optional: Install if not using
import courseContent from "../data/courseContent"; // Assume enhanced structure
import "../styles/courseLearn.css";

// Custom hook for lessons (replace with real API)
const useCourseLessons = (slug) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const courseLessons = courseContent[slug] || [];
      if (courseLessons.length > 0) {
        setLessons(courseLessons);
      } else {
        setError("No lessons found for this course.");
      }
      setLoading(false);
    }, 500); // Simulate delay
  }, [slug]);

  return { lessons, loading, error };
};

// ProgressBar component
const ProgressBar = React.memo(({ progress }) => (
  <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    <span className="progress-text">{progress}% Complete</span>
  </div>
));

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

// LessonItem component
const LessonItem = React.memo(({ lesson, isActive, isCompleted, onSelect, onComplete }) => (
  <div
    className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
    onClick={() => onSelect(lesson.id)}
    role="button"
    tabIndex="0"
    aria-label={`Lesson ${lesson.id}: ${lesson.title}`}
    onKeyDown={(e) => e.key === 'Enter' && onSelect(lesson.id)}
  >
    <div className="lesson-header">
      <h4>{lesson.id}. {lesson.title}</h4>
      {isCompleted && <i className="fas fa-check-circle" aria-hidden="true"></i>}
    </div>
    <p>{lesson.description}</p>
    {isActive && (
      <button onClick={onComplete} className="complete-btn" aria-label="Mark lesson as complete">
        Mark Complete
      </button>
    )}
  </div>
));

LessonItem.propTypes = {
  lesson: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

// LessonNavigation component
const LessonNavigation = ({ currentLesson, totalLessons, onNext, onPrev }) => (
  <div className="lesson-navigation">
    <button disabled={currentLesson === 1} onClick={onPrev} aria-label="Previous lesson">
      <i className="fas fa-arrow-left" aria-hidden="true"></i> Previous
    </button>
    <span>Lesson {currentLesson} of {totalLessons}</span>
    <button disabled={currentLesson === totalLessons} onClick={onNext} aria-label="Next lesson">
      Next <i className="fas fa-arrow-right" aria-hidden="true"></i>
    </button>
  </div>
);

LessonNavigation.propTypes = {
  currentLesson: PropTypes.number.isRequired,
  totalLessons: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

function CourseLearn() {
  const { slug } = useParams();
  const { lessons, loading, error } = useCourseLessons(slug);
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState(() => JSON.parse(localStorage.getItem(`completed-${slug}`) || "[]"));

  const courseTitle = slug.replaceAll("-", " ").toUpperCase();
  const progress = useMemo(() => Math.round((completedLessons.length / lessons.length) * 100), [completedLessons, lessons]);

  const currentLesson = lessons.find((l) => l.id === currentLessonId) || {};

  const handleSelectLesson = (id) => {
    if (completedLessons.includes(currentLessonId) || id <= currentLessonId + 1) {
      setCurrentLessonId(id);
    }
  };

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(currentLessonId)) {
      const updated = [...completedLessons, currentLessonId];
      setCompletedLessons(updated);
      localStorage.setItem(`completed-${slug}`, JSON.stringify(updated));
      if (currentLessonId < lessons.length) setCurrentLessonId(currentLessonId + 1);
    }
  };

  const handleNext = () => {
    if (currentLessonId < lessons.length) setCurrentLessonId(currentLessonId + 1);
  };

  const handlePrev = () => {
    if (currentLessonId > 1) setCurrentLessonId(currentLessonId - 1);
  };

  if (loading) return <div className="loading">Loading lessons...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-learn container">
      <h1>{courseTitle}</h1>
      <ProgressBar progress={progress} />

      <div className="learn-layout">
        <aside className="lesson-sidebar" aria-labelledby="sidebar-heading">
          <h3 id="sidebar-heading">Lessons</h3>
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isActive={lesson.id === currentLessonId}
              isCompleted={completedLessons.includes(lesson.id)}
              onSelect={handleSelectLesson}
              onComplete={handleCompleteLesson}
            />
          ))}
        </aside>

        <main className="lesson-content" aria-labelledby="content-heading">
          <h2 id="content-heading">{currentLesson.title}</h2>
          <p>{currentLesson.description}</p>
          {currentLesson.video && (
            <div className="video-placeholder">
              <p>Video: {currentLesson.video}</p> {/* Replace with actual video player */}
            </div>
          )}
          {currentLesson.quiz && (
            <div className="quiz-placeholder">
              <p>Quiz: {currentLesson.quiz}</p> {/* Replace with quiz component */}
            </div>
          )}
          <LessonNavigation
            currentLesson={currentLessonId}
            totalLessons={lessons.length}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </main>
      </div>

      {progress === 100 && (
        <div className="completion-message">
          🎉 Congratulations! You've completed the course. <a href="/certificate">Download Certificate</a>
        </div>
      )}
    </div>
  );
}

export default CourseLearn;