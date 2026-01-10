// Base API URL
export const API_URL = "http://localhost:5000/api";

// -------- JOB APIs --------
export const fetchJobs = async () => {
  try {
    // 🔹 Backend ready code
    // const res = await fetch(`${API_URL}/jobs`);
    // if (!res.ok) throw new Error("Failed to fetch jobs");
    // return await res.json();

    // 🔹 Dummy data (Frontend phase)
    return [
      {
        id: 1,
        role: "React Developer",
        company: "Tech Solutions",
        location: "Remote",
        experience: "0–2 Years",
      },
      {
        id: 2,
        role: "Backend Developer",
        company: "Startup Hub",
        location: "Bangalore",
        experience: "1–3 Years",
      },
    ];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
