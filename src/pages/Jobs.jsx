import { useState, useEffect, useMemo } from "react";
import "../styles/jobs.css";

/* ================= MOCK JOB DATA (50 COMPANIES) ================= */
const mockJobs = [
  { id: 1, role: "React Developer", company: "Tech Solutions Pvt Ltd", location: "Remote", email: "hr@techsolutions.com", applyLink: "https://techsolutions.com/careers" },
  { id: 2, role: "Backend Developer", company: "Startup Hub", location: "Bangalore", email: "jobs@startuphub.in", applyLink: "https://startuphub.in/jobs" },
  { id: 3, role: "Full Stack Developer", company: "CodeCraft Technologies", location: "Remote", email: "careers@codecraft.io", applyLink: "https://codecraft.io/careers" },
  { id: 4, role: "Java Developer", company: "Enterprise Softwares", location: "Hyderabad", email: "hr@enterprisesoft.com", applyLink: "https://enterprisesoft.com/jobs" },
  { id: 5, role: "Python Developer", company: "AI Labs India", location: "Bangalore", email: "jobs@ailabs.ai", applyLink: "https://ailabs.ai/careers" },
  { id: 6, role: "DevOps Engineer", company: "CloudNet Systems", location: "Remote", email: "devops@cloudnet.com", applyLink: "https://cloudnet.com/careers" },
  { id: 7, role: "Data Analyst", company: "Analytics Corp", location: "Pune", email: "careers@analyticscorp.com", applyLink: "https://analyticscorp.com/jobs" },
  { id: 8, role: "UI/UX Designer", company: "Creative Studio", location: "Delhi", email: "design@creativestudio.com", applyLink: "https://creativestudio.com/jobs" },
  { id: 9, role: "Cyber Security Analyst", company: "SecureTech India", location: "Noida", email: "security@securetech.com", applyLink: "https://securetech.com/careers" },
  { id: 10, role: "Cloud Engineer", company: "AWS Partners India", location: "Remote", email: "jobs@awspartners.in", applyLink: "https://awspartners.in/jobs" },

  { id: 11, role: "Android Developer", company: "Appify Labs", location: "Mumbai", email: "hr@appify.in", applyLink: "https://appify.in/careers" },
  { id: 12, role: "iOS Developer", company: "iTech Mobile", location: "Bangalore", email: "careers@itechmobile.com", applyLink: "https://itechmobile.com/jobs" },
  { id: 13, role: "QA Engineer", company: "TestPro Solutions", location: "Pune", email: "qa@testpro.com", applyLink: "https://testpro.com/careers" },
  { id: 14, role: "Software Tester", company: "BugFree Systems", location: "Indore", email: "jobs@bugfree.io", applyLink: "https://bugfree.io/jobs" },
  { id: 15, role: "ML Engineer", company: "DeepVision AI", location: "Remote", email: "careers@deepvision.ai", applyLink: "https://deepvision.ai/careers" },

  { id: 16, role: "Data Engineer", company: "DataFlow Pvt Ltd", location: "Hyderabad", email: "jobs@dataflow.com", applyLink: "https://dataflow.com/jobs" },
  { id: 17, role: "System Administrator", company: "NetSecure Solutions", location: "Delhi", email: "sysadmin@netsecure.com", applyLink: "https://netsecure.com/careers" },
  { id: 18, role: "IT Support Engineer", company: "HelpDesk Pro", location: "Jaipur", email: "support@helpdeskpro.in", applyLink: "https://helpdeskpro.in/jobs" },
  { id: 19, role: "Project Coordinator", company: "AgileWorks India", location: "Ahmedabad", email: "pm@agileworks.com", applyLink: "https://agileworks.com/careers" },
  { id: 20, role: "Frontend Developer", company: "UI Masters", location: "Remote", email: "jobs@uimasters.io", applyLink: "https://uimasters.io/jobs" },

  { id: 21, role: "Node.js Developer", company: "API Builders", location: "Chennai", email: "backend@apibuilders.com", applyLink: "https://apibuilders.com/careers" },
  { id: 22, role: "React Native Developer", company: "MobileX", location: "Remote", email: "mobile@mobilex.io", applyLink: "https://mobilex.io/jobs" },
  { id: 23, role: "Blockchain Developer", company: "BlockWorks India", location: "Bangalore", email: "blockchain@blockworks.io", applyLink: "https://blockworks.io/careers" },
  { id: 24, role: "Game Developer", company: "PixelPlay Studios", location: "Pune", email: "games@pixelplay.com", applyLink: "https://pixelplay.com/jobs" },
  { id: 25, role: "AR/VR Developer", company: "MetaVision Tech", location: "Remote", email: "xr@metavision.tech", applyLink: "https://metavision.tech/careers" },

  { id: 26, role: "SEO Specialist", company: "RankBoost Agency", location: "Delhi", email: "seo@rankboost.in", applyLink: "https://rankboost.in/jobs" },
  { id: 27, role: "Digital Marketer", company: "Growth Hackers", location: "Mumbai", email: "marketing@growthhackers.in", applyLink: "https://growthhackers.in/careers" },
  { id: 28, role: "Product Manager", company: "ProductLabs", location: "Bangalore", email: "pm@productlabs.com", applyLink: "https://productlabs.com/jobs" },
  { id: 29, role: "HR Executive", company: "PeopleFirst HR", location: "Noida", email: "hr@peoplefirst.com", applyLink: "https://peoplefirst.com/careers" },
  { id: 30, role: "Business Analyst", company: "Insight Analytics", location: "Pune", email: "ba@insightanalytics.com", applyLink: "https://insightanalytics.com/jobs" },

  { id: 31, role: "Network Engineer", company: "NetCore Systems", location: "Chennai", email: "network@netcore.com", applyLink: "https://netcore.com/careers" },
  { id: 32, role: "Database Administrator", company: "DataGuard", location: "Hyderabad", email: "dba@dataguard.com", applyLink: "https://dataguard.com/jobs" },
  { id: 33, role: "AI Research Engineer", company: "FutureAI Labs", location: "Remote", email: "ai@futureai.ai", applyLink: "https://futureai.ai/careers" },
  { id: 34, role: "Technical Writer", company: "DocuTech", location: "Remote", email: "docs@docutech.io", applyLink: "https://docutech.io/jobs" },
  { id: 35, role: "Support Engineer", company: "SaaS Support", location: "Indore", email: "support@saassupport.in", applyLink: "https://saassupport.in/careers" },

  { id: 36, role: "Salesforce Developer", company: "CRM Masters", location: "Bangalore", email: "salesforce@crmmasters.com", applyLink: "https://crmmasters.com/jobs" },
  { id: 37, role: "SAP Consultant", company: "ERP Solutions", location: "Mumbai", email: "sap@erpsolutions.com", applyLink: "https://erpsolutions.com/careers" },
  { id: 38, role: "Embedded Systems Engineer", company: "IoT Labs", location: "Pune", email: "iot@iotlabs.com", applyLink: "https://iotlabs.com/jobs" },
  { id: 39, role: "Robotics Engineer", company: "RoboTech", location: "Remote", email: "robotics@robotech.ai", applyLink: "https://robotech.ai/careers" },
  { id: 40, role: "Automation Tester", company: "AutoTest Pro", location: "Noida", email: "qa@autotestpro.com", applyLink: "https://autotestpro.com/jobs" },

  { id: 41, role: "Content Writer", company: "Contentify", location: "Remote", email: "content@contentify.in", applyLink: "https://contentify.in/careers" },
  { id: 42, role: "Technical Recruiter", company: "HireFast", location: "Bangalore", email: "recruit@hirefast.com", applyLink: "https://hirefast.com/jobs" },
  { id: 43, role: "UX Researcher", company: "UserFirst Labs", location: "Remote", email: "ux@userfirstlabs.com", applyLink: "https://userfirstlabs.com/careers" },
  { id: 44, role: "IT Trainer", company: "SkillForge Academy", location: "Delhi", email: "trainer@skillforge.in", applyLink: "https://skillforge.in/jobs" },
  { id: 45, role: "EdTech Consultant", company: "LearnX", location: "Remote", email: "consult@learnx.io", applyLink: "https://learnx.io/careers" },

  { id: 46, role: "Web Designer", company: "Designify", location: "Mumbai", email: "design@designify.in", applyLink: "https://designify.in/jobs" },
  { id: 47, role: "System Analyst", company: "TechBridge", location: "Hyderabad", email: "analyst@techbridge.com", applyLink: "https://techbridge.com/careers" },
  { id: 48, role: "Platform Engineer", company: "InfraStack", location: "Remote", email: "infra@infrastack.io", applyLink: "https://infrastack.io/jobs" },
  { id: 49, role: "Security Engineer", company: "CyberSafe", location: "Bangalore", email: "security@cybersafe.com", applyLink: "https://cybersafe.com/careers" },
  { id: 50, role: "Tech Support Lead", company: "SupportHub", location: "Pune", email: "lead@supporthub.in", applyLink: "https://supporthub.in/jobs" },
];

/* ================= JOBS PAGE ================= */
function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [savedJobs, setSavedJobs] = useState(
    JSON.parse(localStorage.getItem("savedJobs") || "[]")
  );

  useEffect(() => {
    setTimeout(() => setJobs(mockJobs), 500);
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      `${job.role} ${job.company} ${job.location}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [jobs, search]);

  const toggleSave = (id) => {
    const updated = savedJobs.includes(id)
      ? savedJobs.filter((j) => j !== id)
      : [...savedJobs, id];

    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
  };

  return (
    <div className="jobs-page">
      <h2>💼 Explore Job Opportunities</h2>
      <p className="jobs-subtitle">
        Apply directly to companies or contact HR
      </p>

      <input
        className="job-search"
        placeholder="Search job, company or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.role}</h3>
            <p><strong>{job.company}</strong></p>
            <p>{job.location}</p>

            <div className="job-actions">
              <a href={`mailto:${job.email}`} className="btn outline">
                Email HR
              </a>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                Apply
              </a>
            </div>

            <button
              className="save-job"
              onClick={() => toggleSave(job.id)}
            >
              {savedJobs.includes(job.id) ? "❤️ Saved" : "🤍 Save Job"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
