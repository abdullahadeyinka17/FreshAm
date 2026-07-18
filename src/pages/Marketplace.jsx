import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { produceAPI } from "../services/api";
import "./Marketplace.css";

function Marketplace() {
    const [produce, setProduce]   = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState("");
    const [search, setSearch]     = useState("");
    const [filter, setFilter]     = useState("all");

    // Fetch all produce when page loads
    useEffect(() => {
        produceAPI.getAll()
            .then((data) => {
                // Handle different response shapes from backend
                setProduce(data.data || data.produce || data || []);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // Filter produce based on search + category filter
    const filtered = produce.filter((item) => {
        const matchSearch = item.name?.toLowerCase().includes(search.toLowerCase()) ||
                           item.location?.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || item.category === filter;
        return matchSearch && matchFilter;
    });

    if (loading) return <div className="page-loading">⏳ Loading listings...</div>;
    if (error)   return <div className="page-error">❌ {error}</div>;

    return (
        <div className="marketplace">
            {/* Header */}
            <div className="marketplace__header">
                <div className="marketplace__header-text">
                    <h1>🍅 Marketplace</h1>
                    <p>Fresh produce listings from farmers across Nigeria</p>
                </div>

                {/* Search */}
                <input
                    className="marketplace__search"
                    type="text"
                    placeholder="Search by name or location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="marketplace__filters">
                {["all", "fresh", "dried", "processed"].map((f) => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? "active" : ""}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
                <span className="marketplace__count">
                    {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* Grid of produce cards */}
            {filtered.length === 0 ? (
                <div className="marketplace__empty">
                    <p>🔍 No listings found. Try a different search!</p>
                </div>
            ) : (
                <div className="produce-grid">
                    {filtered.map((item) => (
                        <ProduceCard key={item._id || item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Reusable Produce Card ────────────────────────────────────
function ProduceCard({ item }) {
    return (
        <Link to={`/produce/${item._id || item.id}`} className="produce-card">
            <div className="produce-card__img">
                {item.image ? (
                    <img src={item.image} alt={item.name} />
                ) : (
                    <span>🍅</span>
                )}
            </div>
            <div className="produce-card__body">
                <h3 className="produce-card__name">{item.name || "Tomatoes"}</h3>
                <p className="produce-card__location">📍 {item.location || "Nigeria"}</p>
                <div className="produce-card__footer">
                    <span className="produce-card__price">
                        ₦{Number(item.price || 0).toLocaleString()}
                        <small>/kg</small>
                    </span>
                    <span className="produce-card__qty">
                        {item.quantity || 0}kg available
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default Marketplace;