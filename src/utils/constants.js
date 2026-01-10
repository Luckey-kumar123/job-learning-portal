// export const APP_NAME = "JobLearn Portal";
 /* ================= APP INFO ================= */
export const APP_NAME = "JobLearn";
export const APP_TAGLINE = "Learn Skills. Get Jobs. Grow Your Career.";
export const APP_YEAR = 2026;

/* ================= USER ROLES ================= */
export const USER_ROLES = [
  "Student",
  "Fresher",
  "Professional",
];

/* ================= COURSE CATEGORIES ================= */
export const COURSE_CATEGORIES = [
  "Web Development",
  "Data Science",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cyber Security",
  "Mobile App Development",
  "UI / UX Design",
  "Blockchain",
];

/* ================= COURSES DATA ================= */
export const COURSES = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "HTML, CSS, JavaScript, React, Node.js, MongoDB",
    duration: "6 Months",
    category: "Web Development",
    free: true,
  },
  {
    id: 2,
    title: "Data Science",
    description: "Python, Statistics, Machine Learning",
    duration: "5 Months",
    category: "Data Science",
    free: true,
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    description: "AI concepts, Neural Networks, Deep Learning",
    duration: "6 Months",
    category: "Artificial Intelligence",
    free: true,
  },
  {
    id: 4,
    title: "Cloud Computing & DevOps",
    description: "AWS, Docker, CI/CD fundamentals",
    duration: "4 Months",
    category: "Cloud Computing",
    free: true,
  },
  {
    id: 5,
    title: "Cyber Security",
    description: "Ethical Hacking, Network Security",
    duration: "4 Months",
    category: "Cyber Security",
    free: true,
  },
];

/* ================= JOB TYPES ================= */
export const JOB_TYPES = [
  "Full Time",
  "Part Time",
  "Internship",
  "Remote",
];

/* ================= JOB ROLES ================= */
export const JOB_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "UI/UX Designer",
  "DevOps Engineer",
  "Cyber Security Analyst",
];

/* ================= UI TEXT ================= */
export const UI_TEXT = {
  LOGIN_TITLE: "Welcome Back 👋",
  LOGIN_SUBTITLE: "Login to access your dashboard",
  REGISTER_TITLE: "Create Your Account",
  REGISTER_SUBTITLE: "Start learning and applying for jobs",
  DASHBOARD_TITLE: "My Dashboard",
  NO_COURSE_TEXT: "You have not enrolled in any course yet.",
  NO_JOB_TEXT: "No jobs available at the moment.",
};

/* ================= ROUTES ================= */
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  COURSES: "/courses",
  JOBS: "/jobs",
};

/* ================= STORAGE KEYS ================= */
export const STORAGE_KEYS = {
  USER: "joblearn_user",
  COURSES: "joblearn_courses",
};
