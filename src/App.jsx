import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute  from "./components/ProtectedRoute";
import Navbar      from "./components/Navbar";
import Home        from "./pages/Home";
import Login       from "./pages/Login";
import Register    from "./pages/Register";
import Marketplace from "./pages/Marketplace";
import Dashboard   from "./pages/Dashboard";
import "./style/variables.css";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app">
                    <Navbar />
                    <main className="main">
                        <Routes>
                            {/* Public routes — anyone can visit */}
                            <Route path="/"           element={<Home />} />
                            <Route path="/login"      element={<Login />} />
                            <Route path="/register"   element={<Register />} />
                            <Route path="/marketplace" element={<Marketplace />} />

                            {/* Protected routes — must be logged in! */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            {/* 404 — catch all unknown routes */}
                            <Route
                                path="*"
                                element={
                                    <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
                                        <h1 style={{ fontSize: "4rem", color: "#e4e4e7" }}>404</h1>
                                        <p style={{ color: "#666" }}>Page not found</p>
                                    </div>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
