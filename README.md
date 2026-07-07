# ERP Integration Framework

Production-style Node.js API that simulates an ERP integration layer between SAP S/4HANA-style financial data and an external analytics platform.

## Why This Project Matters

Modern companies run finance, operations, and reporting across multiple systems. This API demonstrates how a backend integration service can extract ERP records, transform them into analytics-ready financial data, secure the workflow with JWT authentication and RBAC, and expose operational endpoints for documentation, health checks, logging, and automation.

## Features

- Express.js REST API with clear route/service/connector boundaries
- JWT authentication with role-based access control
- ERP extraction, transformation, and analytics sync pipeline
- Retry handling for integration failures
- Request IDs for traceability across logs and responses
- Structured JSON logging with Winston
- Health and metrics endpoints for operational monitoring
- Swagger/OpenAPI documentation at `/api-docs`
- Docker and Docker Compose readiness
- PostgreSQL-compatible configuration for production persistence
- GitHub Actions CI workflow
- Scheduler support for automated sync jobs

## Tech Stack

- Node.js
- Express.js
- JWT
- Axios
- Winston
- Swagger/OpenAPI
- Docker
- PostgreSQL-ready configuration

## Project Structure

```text
config/            Environment, logging, Swagger, database config
connectors/        External SAP and analytics platform clients
middleware/        Auth, RBAC, validation, request context, logging, rate limits
routes/            API endpoints
services/          Business logic and integration orchestration
scheduler/         Cron-based automated sync
transformations/   ERP to financial analytics data mapping
docs/              Architecture and presentation material
test/              Node.js test suite
```

## Getting Started

```bash
npm install
cp .env.example .env
npm start
```

Default local URL:

```text
http://localhost:3000
```

Open the enterprise dashboard:

```text
http://localhost:3000
```

Open API documentation:

```text
http://localhost:3000/api-docs
```

## Environment Variables

```text
PORT=3000
NODE_ENV=development
JWT_SECRET=replace-with-a-long-random-secret
SAP_API_URL=https://jsonplaceholder.typicode.com/users
ANALYTICS_API_URL=https://jsonplaceholder.typicode.com/posts
DATABASE_URL=postgresql://erp_user:erp_password@localhost:5432/erp_integration
ENABLE_SCHEDULER=false
INTEGRATION_CRON=*/30 * * * * *
```

## API Endpoints

| Method | Endpoint | Purpose | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/login` | Returns JWT token | Public |
| GET | `/financial-data` | Fetches transformed ERP financial data | JWT |
| POST | `/run-integration` | Runs extract-transform-load workflow | JWT + admin |
| POST | `/custom-integration` | Validates and accepts custom financial data | JWT |
| GET | `/health` | Service health check | Public |
| GET | `/metrics` | Lightweight runtime metrics | Public |
| GET | `/api-docs` | Swagger documentation | Public |

## Demo Dashboard

The root route serves a polished ERP Integration Command Center. It gives recruiters a visual demo of API health, JWT authentication, integration execution, runtime metrics, and transformed financial data.

## Demo Login

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Use the returned token:

```text
Authorization: Bearer <token>
```

## Docker

```bash
docker compose up --build
```

## Testing

```bash
npm test
```

## Architecture Flow

```mermaid
flowchart LR
  Client["Client / Postman / Recruiter Demo"] --> API["Express API"]
  API --> Auth["JWT Auth + RBAC"]
  API --> Service["Integration Service"]
  Service --> SAP["SAP Connector"]
  SAP --> Transform["Financial Transformation"]
  Transform --> Analytics["Analytics Connector"]
  Service --> Logs["Structured Logs"]
  API --> Health["Health + Metrics"]
```

## Production Roadmap

- Replace in-memory demo users with PostgreSQL-backed users
- Persist integration runs, source payload hashes, and audit events
- Add queue-based async processing for high-volume integrations
- Add Prometheus/Grafana metrics in production
- Add contract tests for external SAP and analytics APIs
