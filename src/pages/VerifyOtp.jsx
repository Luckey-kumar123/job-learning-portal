import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // 🚨 Safety: redirect if OTP/email missing
  useEffect(() => {
    const email = localStorage.getItem("otp_email");
    const code = localStorage.getItem("otp_code");

    if (!email || !code) {
      navigate("/register");
    }
  }, [navigate]);

  const handleVerify = (e) => {
    e.preventDefault();

    const storedOtp = localStorage.getItem("otp_code");
    const email = localStorage.getItem("otp_email");

    if (!otp || otp.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }

    if (otp !== String(storedOtp)) {
      setError("Invalid OTP");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      login(email, true);

      localStorage.removeItem("otp_code");
      localStorage.removeItem("otp_email");

      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleVerify}>
        <h2>Verify OTP</h2>
        <p className="subtitle">
          Enter the 6-digit OTP sent to your email
        </p>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          placeholder="Enter OTP"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;
