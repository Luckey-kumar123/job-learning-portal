import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-brand">
          <h3>JobLearn</h3>
          <p>
            JobLearn is a universal job cum learning platform designed to help
            students, freshers, and working professionals build in-demand skills,
            earn certifications, and apply for jobs from one single platform.
          </p>
        </div>

        {/* LEARNING */}
        <div className="footer-links">
          <h4>Learning</h4>
          <p className="footer-desc">
            Learn industry-ready skills through structured courses, hands-on
            projects, and certifications.
          </p>
          <Link to="/courses">All Courses</Link>
          <Link to="/courses">Free Skill-Based Courses</Link>
          <Link to="/courses">Career-Oriented Learning</Link>
          <Link to="/courses">Certificates & Training</Link>
        </div>

        {/* JOBS */}
        <div className="footer-links">
          <h4>Jobs</h4>
          <p className="footer-desc">
            Explore verified job opportunities and apply directly to hiring
            companies across multiple domains.
          </p>
          <Link to="/jobs">Browse All Jobs</Link>
          <Link to="/jobs">Remote & Work-From-Home Jobs</Link>
          <Link to="/jobs">Fresher & Entry-Level Jobs</Link>
          <Link to="/jobs">Company Hiring Links</Link>
        </div>

        {/* SUPPORT */}
        <div className="footer-links">
          <h4>Support</h4>
          <p className="footer-desc">
            Need help? Our support team is here to assist you with learning and
            job applications.
          </p>
          <a href="#">Help Center</a>
          <a href="#">Contact Support</a>
          <a href="#">Frequently Asked Questions</a>
          <a href="#">Report an Issue</a>
        </div>

        {/* LEGAL */}
        <div className="footer-links">
          <h4>Legal</h4>
          <p className="footer-desc">
            Read our policies to understand how we protect your data and ensure
            platform transparency.
          </p>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>
          © 2026 <strong>JobLearn Portal</strong>. All Rights Reserved.
        </p>
        <span>
          A trusted platform for learning, career growth, and employment.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
