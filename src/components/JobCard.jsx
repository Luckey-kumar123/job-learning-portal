function JobCard({ role, company, location, experience }) {
  return (
    <div className="card">
      <h3>{role}</h3>
      <p><strong>{company}</strong></p>
      <p>{location}</p>
      <span>Experience: {experience}</span>
      <br />
      <button className="btn">Apply</button>
    </div>
  );
}

export default JobCard;
