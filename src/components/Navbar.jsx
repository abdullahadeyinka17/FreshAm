import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <NavLink to="/" className="navbar__logo">
                <img src="/img/FreshAm.png" alt="FreshAm Logo" className="navbar__logo-img" />
            </NavLink>

            <div className="navbar__links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "navbar__link active" : "navbar__link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/marketplace"
                    className={({ isActive }) =>
                        isActive ? "navbar__link active" : "navbar__link"
                    }
                >
                    Marketplace
                </NavLink>

                {/* Only show these links when logged in */}
                {user && (
                    <>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive ? "navbar__link active" : "navbar__link"
                            }
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                                isActive ? "navbar__link active" : "navbar__link"
                            }
                        >
                            Orders
                        </NavLink>
                    </>
                )}
            </div>

            <div className="navbar__auth">
                {user ? (
                    // Logged in — show user name and logout
                    <>
                        <span className="navbar__username">
                            👋 {user.name || user.firstName || user.email}
                        </span>
                        <button
                            className="navbar__btn navbar__btn--outline"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    // Not logged in — show login/register buttons
                    <>
                        <NavLink to="/login" className="navbar__btn navbar__btn--outline">
                            Login
                        </NavLink>
                        <NavLink to="/register" className="navbar__btn navbar__btn--solid">
                            Get Started
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;