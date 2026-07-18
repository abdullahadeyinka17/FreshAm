
const BASE_URL = "https://fresham.onrender.com";

const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};


const request = async (method, path, body = null) => {
    const options = {
        method,
        headers: getHeaders(),
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${BASE_URL}${path}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    return data;
};


export const authAPI = {
    register: (userData) =>
        request("POST", "/api/v1/auth/register", userData),

    login: (credentials) =>
        request("POST", "/api/v1/auth/login", credentials),

    getProfile: () =>
        request("GET", "/api/v1/auth/profile"),

    logout: () =>
        request("POST", "/api/v1/auth/logout"),
};


export const produceAPI = {
    // Get all produce listings
    getAll: (params = "") =>
        request("GET", `/api/v1/produce${params}`),

    // Get one produce by ID
    getOne: (id) =>
        request("GET", `/api/v1/produce/${id}`),

    // Create new produce listing (farmers only)
    create: (data) =>
        request("POST", "/api/v1/produce", data),

    // Update a produce listing
    update: (id, data) =>
        request("PUT", `/api/v1/produce/${id}`, data),

    // Delete a produce listing
    delete: (id) =>
        request("DELETE", `/api/v1/produce/${id}`),
};


export const ordersAPI = {
    // Get all orders for logged-in user
    getAll: () =>
        request("GET", "/api/v1/orders"),

    // Get one order by ID
    getOne: (id) =>
        request("GET", `/api/v1/orders/${id}`),

    // Place a new order
    create: (data) =>
        request("POST", "/api/v1/orders", data),

    // Update order status
    update: (id, data) =>
        request("PUT", `/api/v1/orders/${id}`, data),
};

// ============================================================
//  USERS ENDPOINTS
// ============================================================
export const usersAPI = {
    // Get all users (admin only)
    getAll: () =>
        request("GET", "/api/v1/users"),

    // Update user profile
    update: (id, data) =>
        request("PUT", `/api/v1/users/${id}`, data),
};