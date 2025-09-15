import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import astralLogoiso from "../assets/img/astral_logo_isolated_no_slogan_v2.png";
import bg from "../assets/img/astral-bg-desktop.png";

export const Login = () => {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // ui state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // backend base URL (no trailing slash)
  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.msg || "Login failed");
        setLoading(false);
        return;
      }

      // store token + user
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // optional “remember me” using localStorage
      if (remember) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // go somewhere after login
      navigate("/dashboard"); // change to "/renter-dashboard" or wherever you want
    } catch {
      setError("Network error. Check your backend is running on the right port.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 px-3"
      style={{
        backgroundImage: `linear-gradient(rgba(26,18,49,0.55), rgba(26,18,49,0.55)), url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-4"
        style={{ width: 360, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(6px)" }}
      >
        <img
          src={astralLogoiso}
          alt="Astral"
          className="img-fluid mx-auto d-block mb-3"
          style={{ maxHeight: 120 }}
          loading="lazy"
          decoding="async"
        />

        <h1 className="h4 mb-3 text-center text-white">Please log in</h1>

        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label text-white">
            Email
          </label>
          <input
            id="loginEmail"
            name="email"
            type="email"
            className="form-control"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="form-label text-white">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label className="form-check-label text-white" htmlFor="remember">
            Remember me
          </label>
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <div className="alert alert-danger mt-3 mb-0" role="alert">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};