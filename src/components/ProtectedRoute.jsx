import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // While checking if user is logged in — show nothing
    if (loading) {
        return (
            <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <p>Loading...</p>
            </div>
        );
    }

    // Not logged in → redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in → show the protected page
    return children;
}

const styles = {
    loading: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "1rem",
        color: "#71717a",
    },
    spinner: {
        width: "36px",
        height: "36px",
        border: "3px solid #e4e4e7",
        borderTop: "3px solid #e63946",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
};

export default ProtectedRoute;