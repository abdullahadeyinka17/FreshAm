import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Register() {
    const { register } = useAuth();
    const navigate     = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "buyer", // "farmer", "buyer", or "logistics"
        phone: "",
    });
    const [error, setError]     = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await register(form);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card auth-card--wide">
                <div className="auth-card__header">
                    <h1 className="auth-card__title">🍅 Join TomatoLink</h1>
                    <p className="auth-card__subtitle">
                        Create your free account and start trading
                    </p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Role Selection */}
                    <div className="form-group">
                        <label className="form-label">I am a...</label>
                        <div className="role-picker">
                            {["farmer", "buyer", "logistics"].map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    className={`role-btn ${form.role === r ? "active" : ""}`}
                                    onClick={() => setForm({ ...form, role: r })}
                                >
                                    {r === "farmer"    && "👨‍🌾 Farmer"}
                                    {r === "buyer"     && "🛒 Buyer"}
                                    {r === "logistics" && "🚛 Logistics"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Name row */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">First Name</label>
                            <input
                                className="form-input"
                                type="text"
                                name="firstName"
                                placeholder="John"
                                value={form.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Last Name</label>
                            <input
                                className="form-input"
                                type="text"
                                name="lastName"
                                placeholder="Doe"
                                value={form.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                            className="form-input"
                            type="tel"
                            name="phone"
                            placeholder="08012345678"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            placeholder="Min 8 characters"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Free Account"}
                    </button>
                </form>

                <p className="auth-card__footer">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;