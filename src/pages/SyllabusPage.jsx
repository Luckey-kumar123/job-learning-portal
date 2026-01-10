import { useParams, Link } from "react-router-dom";
import syllabusData from "../data/syllabusData";
import "../styles/syllabusPage.css";

function SyllabusPage() {
  const { slug } = useParams();
  const course = syllabusData.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="syllabus-page container">
        <h2>Course Not Found</h2>
      </div>
    );
  }

  return (
    <div className="syllabus-page container">
      {/* HEADER */}
      <div className="syllabus-header">
        <h1>{course.title}</h1>
        <p className="subtitle">
          Detailed syllabus & learning roadmap
        </p>
      </div>

      {/* META INFO */}
      <div className="syllabus-meta">
        <div>
          <span>⏱ Duration</span>
          <p>{course.duration}</p>
        </div>

        <div>
          <span>🧠 Skills</span>
          <p>{course.skills}</p>
        </div>
      </div>

      {/* INTERNAL SYLLABUS */}
      <h2 className="section-title">Course Syllabus</h2>
      <div className="syllabus-list">
        {course.syllabus.map((item, index) => (
          <div key={index} className="syllabus-item">
            <span className="index">{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="syllabus-actions">
        <Link to={`/courses/${course.slug}`} className="btn outline">
          View Course
        </Link>

        {course.externalSyllabus && (
          <a
            href={course.externalSyllabus}
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            Official Syllabus (W3Schools)
          </a>
        )}
      </div>
    </div>
  );
}

export default SyllabusPage;
