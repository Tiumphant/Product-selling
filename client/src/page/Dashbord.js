import { useEffect } from "react";
import './dash.css';
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); 
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const publicRoutes = ["/registration", "/login"];
    const isPublicRoute = publicRoutes.includes(location.pathname);
    if (!token && !isPublicRoute) {
      navigate("/login");
    }
  }, [token, navigate, location]);

  const handleLogout = () => {
    console.log("handlelogout");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <nav className="nav">
        {!token ? (
          
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registration">Registration</Link></li>
          </ul>
        ) : (
          
          <>
            <ul>
              <li><Link to="/HomeAdmin">Home</Link></li>
              <li><Link to="/productadmin">Product</Link></li>
              <li><Link to="/productlistadmin">ProductList</Link></li>
            </ul>
            <ul>
              <button onClick={handleLogout}>
                Logout {user?.firstName ? `(${user.firstName})` : ""}
              </button>
            </ul>
          </>
        )}
      </nav>
      
    </div>
  );
}

