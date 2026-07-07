// ===============================
// ERP Integration Dashboard
// ===============================

const BASE_URL = "http://localhost:3000";

let token = "";

// ===============================
// Log Helper
// ===============================

function log(message) {

    const logs = document.getElementById("logsContainer");

    const time = new Date().toLocaleTimeString();

    logs.innerHTML =
        `[${time}] ${message}<br>` +
        logs.innerHTML;

}

// ===============================
// Health
// ===============================

async function loadHealth() {

    try {

        const res = await fetch(`${BASE_URL}/health`);

        const data = await res.json();

        document.getElementById("healthValue").innerText =
            data.status;

        log("Health Check Successful");

    } catch {

        log("Health Check Failed");

    }

}

// ===============================
// Metrics
// ===============================

async function loadMetrics() {

    try {

        const res = await fetch(`${BASE_URL}/metrics`);

        const data = await res.json();

        document.getElementById("runtime").innerText =
            Math.floor(data.uptime) + " s";

        const memory =
            (data.memoryUsage.heapUsed / 1024 / 1024).toFixed(2);

        document.getElementById("memory").innerText =
            memory + " MB";

        log("Metrics Loaded");

    } catch {

        log("Metrics Error");

    }

}

// ===============================
// Login
// ===============================

document.getElementById("loginBtn")
.addEventListener("click", login);

async function login() {

    try {

        const response = await fetch(

            `${BASE_URL}/api/auth/login`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    username: "admin",

                    password: "admin123"

                })

            }

        );

        const data = await response.json();

        token = data.token;

        document.getElementById("authStatus")
            .innerText = "Authenticated";

        log("Administrator Logged In");

        alert("Login Successful");

    }

    catch {

        alert("Login Failed");

    }

}

// ===============================
// Financial Data
// ===============================

document.getElementById("loadBtn")
.addEventListener("click", loadFinancialData);

async function loadFinancialData() {

    if (!token) {

        alert("Please Login First");

        return;

    }

    const response = await fetch(

        `${BASE_URL}/api/v1/financial-data`,

        {

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );

    const data = await response.json();

    const table =
        document.getElementById("financialTable");

    table.innerHTML = "";

    data.forEach(record => {

        table.innerHTML +=

        `<tr>

            <td>${record.id}</td>

            <td>${record.company}</td>

            <td>${record.revenue}</td>

            <td>${record.profit}</td>

        </tr>`;

    });

    log("Financial Records Loaded");

}

// ===============================
// Run Integration
// ===============================

document.getElementById("integrationBtn")
.addEventListener("click", runIntegration);

async function runIntegration() {

    if (!token) {

        alert("Please Login First");

        return;

    }

    const response = await fetch(

        `${BASE_URL}/api/v1/run-integration`,

        {

            method: "POST",

            headers: {

                Authorization:
                    `Bearer ${token}`

            }

        }

    );

    const result =
        await response.json();

    log("Integration Executed");

    alert(result.message);

}

// ===============================
// Initial Load
// ===============================

loadHealth();

loadMetrics();

setInterval(loadHealth,10000);

setInterval(loadMetrics,10000);