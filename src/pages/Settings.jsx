function Settings() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>⚙️ Settings</h1>

      <div style={{ marginTop: "20px" }}>
        <label>
          <input type="checkbox" /> Enable Dark Mode
        </label>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button style={{ padding: "10px 20px" }}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Settings;
