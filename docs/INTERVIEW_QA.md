# Interview Questions and Answers

## 1. What problem does this project solve?

It solves the problem of moving financial data from an ERP system into an analytics platform in a secure and automated way. The project simulates extraction, transformation, loading, retry handling, logging, and scheduled synchronization.

## 2. Why did you separate routes, services, connectors, and transformations?

Each layer has a single responsibility. Routes manage HTTP contracts, services orchestrate workflows, connectors communicate with external systems, and transformations map ERP data into analytics-ready records. This makes the code easier to test, extend, and maintain.

## 3. How is the API secured?

The API uses JWT authentication for protected routes and role-based access control for sensitive operations. For example, only an admin user can trigger the full integration pipeline.

## 4. What makes this production-ready?

It includes structured logging, request IDs, health checks, metrics, Swagger documentation, Docker readiness, CI configuration, environment-based configuration, validation middleware, and scheduler controls. These are the kinds of features teams need when deploying and operating APIs.

## 5. How would you scale this system?

I would move long-running integration work into a queue-based architecture. The API would create jobs, workers would process integrations asynchronously, PostgreSQL would persist job status and audit logs, and monitoring would track job latency and failure rates.

## 6. Why use PostgreSQL?

PostgreSQL is reliable for structured business data, audit logs, integration run history, users, roles, and job state. It also supports transactions, indexing, JSONB, and strong consistency, which are useful in ERP workflows.

## 7. How would AI agents fit into this project?

An AI agent could monitor failed integrations, classify root causes, suggest remediation steps, generate reconciliation reports, or trigger workflows when financial anomalies are detected.

## 8. What would you improve next?

I would add PostgreSQL persistence for users and integration runs, automated contract tests for external APIs, a job queue, Prometheus metrics, and a React dashboard for monitoring integration status.
