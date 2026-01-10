import { useState } from "react";
import { useNavigate } from "react-router-dom";
import syllabusData from "../data/syllabusData";
import "../styles/syllabus.css";

function SyllabusHome() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCourses = syllabusData.filter((course) =>
    `${course.title} ${course.skills}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="syllabus-page">
      <h1 className="page-title">All Course Syllabus</h1>
      <p className="page-subtitle">
        Search and explore detailed syllabus for each course
      </p>

      {/* SEARCH BAR */}
      <input
        className="syllabus-search"
        type="text"
        placeholder="Search syllabus by course or skill..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* SYLLABUS GRID */}
      <div className="syllabus-grid">
        {filteredCourses.length === 0 ? (
          <p className="no-result">No syllabus found</p>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.slug} className="syllabus-card">
              <h3>{course.title}</h3>
              <p>{course.skills}</p>

              <button
                className="btn primary"
                onClick={() => navigate(`/syllabus/${course.slug}`)}
              >
                View Syllabus
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SyllabusHome;
