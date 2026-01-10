import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

/* ================= FORM HOOK ================= */
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateAll = () => {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, setValues, errors, handleChange, validateAll };
};

/* ================= LOGIN ================= */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { values, setValues, errors, handleChange, validateAll } =
    useForm({
      email: "",
      password: "",
      remember: true,
    });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  /* ================= REMEMBER EMAIL ================= */
  useEffect(() => {
    const remembered = localStorage.getItem("rememberedEmail");
    if (remembered) {
      setValues(prev => ({ ...prev, email: remembered }));
    }
  }, [setValues]);

  /* ================= LOGIN HANDLER ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!validateAll()) return;

    if (!captchaVerified) {
      setFormError("Please confirm you are not a robot");
      return;
    }

    try {
      setFormError("");
      setLoading(true);

      // 🔐 Demo Auth (API later)
      await new Promise(res => setTimeout(res, 900));

      login(values.email, values.remember);

      if (values.remember) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/dashboard", { replace: true });
    } catch {
      setFormError("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleLogin} noValidate>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">
          Sign in to continue learning
        </p>

        {formError && <div className="error">{formError}</div>}

        {/* EMAIL */}
        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={values.email}
            onChange={handleChange}
            disabled={loading}
            autoFocus
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        {/* PASSWORD */}
        <div className="field password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            disabled={loading}
          />
          <button
            type="button"
            className="toggle"
            onClick={() => setShowPassword(v => !v)}
            aria-label="Toggle password"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>

        {/* CAPTCHA */}
        <div className="captcha">
          <label>
            <input
              type="checkbox"
              checked={captchaVerified}
              onChange={() => setCaptchaVerified(v => !v)}
              disabled={loading}
            />
            I’m not a robot
          </label>
        </div>

        {/* OPTIONS */}
        <div className="auth-options">
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={handleChange}
              disabled={loading}
            />
            Remember me
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button className="primary-btn" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="switch">
          Don’t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
