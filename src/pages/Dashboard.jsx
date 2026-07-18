import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { produceAPI, ordersAPI } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
    const { user }                = useAuth();
    const [produce, setProduce]   = useState([]);
    const [orders, setOrders]     = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        // Fetch both produce and orders in parallel!
        Promise.allSettled([
            produceAPI.getAll(),
            ordersAPI.getAll(),
        ]).then(([produceResult, ordersResult]) => {
            if (produceResult.status === "fulfilled") {
                const d = produceResult.value;
                setProduce(d.data || d.produce || []);
            }
            if (ordersResult.status === "fulfilled") {
                const d = ordersResult.value;
                setOrders(d.data || d.orders || []);
            }
        }).finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="page-loading">⏳ Loading dashboard...</div>;

    const isFarmer = user?.role === "farmer";

    return (
        <div className="dashboard">
            {/* Welcome header */}
            <div className="dashboard__header">
                <div>
                    <h1>👋 Welcome, {user?.firstName || user?.name || "User"}!</h1>
                    <p className="dashboard__role">
                        Logged in as <strong>{user?.role || "User"}</strong>
                    </p>
                </div>

                {/* Farmers can add new listings */}
                {isFarmer && (
                    <Link to="/produce/new" className="btn-primary">
                        + New Listing
                    </Link>
                )}
            </div>

            {/* Stats row */}
            <div className="dashboard__stats">
                <div className="dash-stat">
                    <p className="dash-stat__num">{produce.length}</p>
                    <p className="dash-stat__label">
                        {isFarmer ? "My Listings" : "Available Produce"}
                    </p>
                </div>
                <div className="dash-stat">
                    <p className="dash-stat__num">{orders.length}</p>
                    <p className="dash-stat__label">Total Orders</p>
                </div>
                <div className="dash-stat">
                    <p className="dash-stat__num">
                        {orders.filter((o) => o.status === "pending").length}
                    </p>
                    <p className="dash-stat__label">Pending Orders</p>
                </div>
                <div className="dash-stat">
                    <p className="dash-stat__num">
                        {orders.filter((o) => o.status === "completed").length}
                    </p>
                    <p className="dash-stat__label">Completed Orders</p>
                </div>
            </div>

            {/* Recent listings */}
            <div className="dashboard__section">
                <div className="dashboard__section-header">
                    <h2>Recent Listings</h2>
                    <Link to="/marketplace" className="view-all">View all →</Link>
                </div>

                {produce.length === 0 ? (
                    <div className="dashboard__empty">
                        <p>No listings yet</p>
                        {isFarmer && (
                            <Link to="/produce/new" className="btn-primary">
                                Add your first listing
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="dashboard__table-wrap">
                        <table className="dashboard__table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produce.slice(0, 5).map((item) => (
                                    <tr key={item._id || item.id}>
                                        <td>{item.name}</td>
                                        <td>₦{Number(item.price || 0).toLocaleString()}/kg</td>
                                        <td>{item.quantity}kg</td>
                                        <td>{item.location}</td>
                                        <td>
                                            <Link
                                                to={`/produce/${item._id || item.id}`}
                                                className="table-link"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Recent orders */}
            <div className="dashboard__section">
                <div className="dashboard__section-header">
                    <h2>Recent Orders</h2>
                    <Link to="/orders" className="view-all">View all →</Link>
                </div>

                {orders.length === 0 ? (
                    <div className="dashboard__empty">
                        <p>No orders yet</p>
                    </div>
                ) : (
                    <div className="dashboard__table-wrap">
                        <table className="dashboard__table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map((order) => (
                                    <tr key={order._id || order.id}>
                                        <td>#{(order._id || order.id)?.slice(-6).toUpperCase()}</td>
                                        <td>₦{Number(order.totalAmount || order.amount || 0).toLocaleString()}</td>
                                        <td>
                                            <span className={`status-badge status-${order.status}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;