// ==========================================
// ERP Integration Command Center
// ==========================================

const BASE_URL = "http://localhost:3000";

let jwtToken = "";

// ================================
// Log Helper
// ================================
function addLog(message) {

    const logs = document.getElementById("logsContainer");

    const time = new Date().toLocaleTimeString();

    logs.innerHTML =
        `<p>[${time}] ${message}</p>` +
        logs.innerHTML;
}

// ================================
// Health API
// ================================
async function loadHealth() {

    try {

        const response = await fetch(`${BASE_URL}/health`);

        const data = await response.json();

        document.getElementById("healthValue").innerText =
            data.status;

        addLog("Health Check Successful");

    } catch {

        addLog("Health Check Failed");

    }

}

// ================================
// Metrics API
// ================================
async function loadMetrics() {

    try {

        const response = await fetch(`${BASE_URL}/metrics`);

        const data = await response.json();

        document.getElementById("runtime").innerText =
            Math.floor(data.uptime) + " sec";

        document.getElementById("memory").innerText =
            (data.memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + " MB";

        addLog("Metrics Updated");

    } catch {

        addLog("Metrics Failed");

    }

}

// ================================
// Login
// ================================
async function login() {

    try {

        const response = await fetch(`${BASE_URL}/api/auth/login`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username: "admin",

                password: "admin123"

            })

        });

        const data = await response.json();

        jwtToken = data.token;

        document.getElementById("authStatus").innerText =
            "Authenticated";

        addLog("Admin Logged In");

        alert("Login Successful");

    }

    catch {

        alert("Login Failed");

    }

}

// ================================
// Financial Data
// ================================
async function loadFinancialData() {

    if (!jwtToken) {

        alert("Please Login First");

        return;

    }

    const response = await fetch(

        `${BASE_URL}/api/v1/financial-data`,

        {

            headers: {

                Authorization: `Bearer ${jwtToken}`

            }

        }

    );

    const data = await response.json();

    const table = document.getElementById("financialTable");

    table.innerHTML = "";

    data.forEach(item => {

        table.innerHTML += `

        <tr>

            <td>${item.id}</td>

            <td>${item.company}</td>

            <td>${item.revenue}</td>

            <td>${item.profit}</td>

        </tr>

        `;

    });

    addLog("Financial Data Loaded");

}

// ================================
// Run Integration
// ================================
async function runIntegration() {

    if (!jwtToken) {

        alert("Please Login First");

        return;

    }

    const response = await fetch(

        `${BASE_URL}/api/v1/run-integration`,

        {

            method: "POST",

            headers: {

                Authorization: `Bearer ${jwtToken}`

            }

        }

    );

    const data = await response.json();

    alert(data.message);

    addLog("Integration Executed");

}

// ================================
// Event Listeners
// ================================
document.getElementById("loginBtn")
.addEventListener("click", login);

document.getElementById("loadBtn")
.addEventListener("click", loadFinancialData);

document.getElementById("integrationBtn")
.addEventListener("click", runIntegration);

// ================================
// Initial Load
// ================================
loadHealth();

loadMetrics();

setInterval(loadHealth, 10000);

setInterval(loadMetrics, 10000);