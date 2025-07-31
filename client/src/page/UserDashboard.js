import { useEffect } from "react";
import './dash.css';
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function UserDashboard() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const publicRoutes = ["/registration", "/login"];
    if (!token && !publicRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [token, navigate, location]);

  const handleLogout = () => {
    console.log("handlelogout");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="nav">
        {!token ? (
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registration">Registration</Link></li>
          </ul>
        ) : (
          <>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/product">Product</Link></li>
              <li><Link to="/productlist">Product List</Link></li>
            </ul>
            <ul>
              <button onClick={handleLogout}>
                Logout {user?.firstName ? `(${user.firstName})` : ""}
              </button>
            </ul>
          </>
        )}
      </nav>
    </>
  );
}
