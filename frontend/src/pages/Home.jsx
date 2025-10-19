import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const apiUrl = import.meta.env.VITE_API_URL

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // to redirect if not logged in

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${apiUrl}/home/me`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [navigate]);

  async function handleLogout() {
    try {
      await axios.post(`${apiUrl}/auth/logout`, {}, {
        withCredentials: true
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      navigate("/login");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>{user?.message}!</h1>

      <button onClick={handleLogout} >
        Logout
      </button>
    </>
  );
}

