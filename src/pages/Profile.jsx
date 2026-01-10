function Profile() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>👤 Profile</h1>
      <p>This is your profile page.</p>

      <form style={{ maxWidth: "400px" }}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Your name"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Your email"
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button style={{ padding: "10px 20px" }}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
