import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

function Home() {
    const { user } = useAuth();

    return (
        <div className="home">
            {/* ── Hero Section ── */}
            <section className="hero">
                <div className="hero__content">
                    <span className="hero__badge">🍅 Fresh from the Farm</span>
                    <h1 className="hero__title">
                        Connecting Farmers<br />
                        to Buyers Directly
                    </h1>
                    <p className="hero__subtitle">
                        FreshAm reduces post-harvest losses by connecting
                        tomato farmers directly to buyers,
                        and markets across Nigeria.
                    </p>
                    <div className="hero__cta">
                        <Link
                            to={user ? "/marketplace" : "/register"}
                            className="btn btn--primary"
                        >
                            {user ? "Browse Marketplace" : "Get Started Free"}
                        </Link>
                        <Link to="/marketplace" className="btn btn--outline">
                            View Listings
                        </Link>
                    </div>
                </div>

                <div className="hero__image">
                    <div className="hero__image-placeholder"> <img src="/img/tomatos.png" alt="Fresh Tomatoes" className="hero__image-img"/> </div>
                </div>
            </section>

            {/* ── Stats Section ── */}
            <section className="stats">
                <div className="stat">
                    <h3 className="stat__number">45%</h3>
                    <p className="stat__label">Post-harvest loss reduced</p>
                </div>
                <div className="stat">
                    <h3 className="stat__number">500+</h3>
                    <p className="stat__label">Farmers connected</p>
                </div>
                <div className="stat">
                    <h3 className="stat__number">₦2M+</h3>
                    <p className="stat__label">Transactions processed</p>
                </div>
                <div className="stat">
                    <h3 className="stat__number">24hrs</h3>
                    <p className="stat__label">Average delivery time</p>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="how-it-works">
                <h2 className="section__title">How FreshAm Works</h2>
                <p className="section__subtitle">
                    Simple steps to connect farmers and buyers
                </p>

                <div className="steps">
                    <div className="step">
                        <div className="step__icon">👨‍🌾</div>
                        <h3 className="step__title">Farmer Lists Produce</h3>
                        <p className="step__desc">
                            Farmers upload their available tomato batches
                            with quantity, price, and location details.
                        </p>
                    </div>
                    <div className="step__arrow">→</div>
                    <div className="step">
                        <div className="step__icon">🔍</div>
                        <h3 className="step__title">Buyer Discovers</h3>
                        <p className="step__desc">
                            Buyers browse available listings and find
                            fresh produce matching their needs.
                        </p>
                    </div>
                    <div className="step__arrow">→</div>
                    <div className="step">
                        <div className="step__icon">🤝</div>
                        <h3 className="step__title">Deal is Made</h3>
                        <p className="step__desc">
                            Buyer places an order, payment is secured,
                            and logistics is arranged for delivery.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="cta-banner">
                <h2>Ready to reduce your post-harvest losses?</h2>
                <p>Join hundreds of farmers already using FreshAm</p>
                <Link to="/register" className="btn btn--white">
                    Create an Account
                </Link>
            </section>
        </div>
    );
}

export default Home;