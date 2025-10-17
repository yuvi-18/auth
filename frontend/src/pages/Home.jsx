import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // to redirect if not logged in

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:5000/home/me", {withCredentials: true});
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
      await axios.post("http://localhost:5000/auth/logout", { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      navigate("/login");
    }
  }

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>{user?.message}!</h1>

      <button onClick={handleLogout} >
        Logout
      </button>
    </>
  );
}

