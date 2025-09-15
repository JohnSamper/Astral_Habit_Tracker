// src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";

export const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view this page.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BACKEND}/api/user/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Unauthorized");
        }

        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-5 text-light">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-5 text-white">
      <h1 className="mb-4">🌱 Welcome back, {user?.name}</h1>

      <div className="card bg-dark p-4 rounded-4 shadow">
        <h5 className="text-white">Your Info:</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item bg-transparent text-white">
            <strong>Email:</strong> {user.email}
          </li>
          <li className="list-group-item bg-transparent text-white">
            <strong>User ID:</strong> {user.id}
          </li>
        </ul>
      </div>
    </div>
  );
};