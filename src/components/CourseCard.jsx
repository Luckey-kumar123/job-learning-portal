import { Link, useNavigate } from "react-router-dom";

export default function CourseCard({
  course,
  isFavorite,
  isWishlisted,
  onToggleFavorite,
  onToggleWishlist,
  onEnroll,
}) {
  const navigate = useNavigate();

  const goToCourse = () => {
    navigate(`/courses/${course.slug}`);
  };

  return (
    <div className="course-card pro">
      <h3 className="course-title" onClick={goToCourse}>
        {course.title}
      </h3>

      <p className="course-instructor">👨‍🏫 {course.instructor}</p>
      <p className="course-desc">{course.description}</p>

      <div className="course-meta">
        <span>⏱ {course.duration}</span>
        <span>🎓 {course.level}</span>
        <span>⭐ {course.rating}</span>
      </div>

      {/* FAVORITE / WISHLIST */}
      <div className="card-actions">
        <button onClick={() => onToggleFavorite(course.id)}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <button onClick={() => onToggleWishlist(course.id)}>
          {isWishlisted ? "🔖" : "📑"}
        </button>
      </div>

      {/* CTA */}
      <div className="card-footer">
        {course.isEnrolled ? (
          <Link
            to={`/courses/${course.slug}`}
            className="btn success full"
          >
            Continue Learning →
          </Link>
        ) : (
          <button
            className="btn primary full"
            onClick={() => onEnroll(course.id, course.slug)}
          >
            Enroll Now
          </button>
        )}

        <button className="btn outline full" onClick={goToCourse}>
          View Details
        </button>
      </div>
    </div>
  );
}
