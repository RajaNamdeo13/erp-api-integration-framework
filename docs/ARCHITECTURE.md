# Architecture Explanation

## System Overview

The ERP Integration Framework is designed as a backend integration layer. Its responsibility is to securely expose API endpoints, retrieve ERP-style financial data, transform that data into an analytics-friendly format, and send it to an external analytics platform.

## Layers

```text
Routes -> Middleware -> Services -> Connectors -> External APIs
```

- Routes handle HTTP contracts.
- Middleware handles cross-cutting concerns such as authentication, authorization, validation, logging, request IDs, and rate limiting.
- Services orchestrate business workflows.
- Connectors isolate external system communication.
- Transformations keep source-data mapping separate from transport and business logic.

## Key Enterprise Decisions

- JWT authentication protects business endpoints.
- RBAC restricts integration execution to admin users.
- Request IDs make each request traceable across API responses and logs.
- Winston emits structured JSON logs for production log platforms.
- Swagger gives recruiters and developers a browsable API contract.
- Health and metrics endpoints support deployment checks and observability.
- Docker Compose includes PostgreSQL to show how the app would run in a production-like environment.
- The scheduler is controlled by environment variables so it can be disabled in local development and enabled in production.

## Scalability Path

For higher volume, the integration workflow can move from synchronous API execution to a queue-based worker model. The API would enqueue jobs, workers would process ERP extraction and analytics sync, and PostgreSQL would store job status, retries, audit logs, and payload metadata.
