---
title: "Apsona Triggered Merge"
description: "End-to-end automation that triggers document generation from Salesforce record changes — spanning Apex triggers, platform events, AWS Lambda, license checks, merge execution, result delivery, and internal monitoring."
pubDate: "2026-04-01"
tags: ["Salesforce", "Apex", "Apsona", "AWS Lambda", "AWS API Gateway", "Platform Events", "Node.js", "Queueable", "Custom Settings", "LWC"]
heroImage: "/apsona.png"
---

# Apsona Triggered Merge

## 📌 Overview

Triggered Merge is one of Apsona's most powerful automation features. It allows Salesforce users to automatically generate documents (PDFs, Word, Excel) and send them via email whenever a record change occurs — an opportunity closing, a case being created, a contract being signed.

I built this feature **end-to-end from scratch**: from the Salesforce-side configuration (flows, triggers, platform events, custom objects) through the AWS integration layer (API Gateway, Lambda, license validation) to the merge execution, result delivery, and an internal monitoring dashboard for the Apsona team.

---

## 🔁 End-to-End Flow

```
Salesforce Record Change
        ↓
  Triggered Flow (Flow Builder)
        ↓
  Platform Event Published
        ↓
  Apex Trigger fires → Apex Classes
        ↓
  Payload built (recordId, orgId, userId, mergeActionId)
        ↓
  Queueable Apex → HTTP POST to AWS API Gateway (JWT + HMAC signed)
        ↓
  Lambda Function
  ├── Validates HMAC + JWT
  ├── License & quota check (Gatekeeper Service)
  └── Queues merge job (RabbitMQ)
        ↓
  Action Service (Node.js)
  ├── Connects to Salesforce via jsforce
  ├── Executes merge with template
  ├── Retry logic (up to 3 attempts)
  └── Sends result back to Salesforce
        ↓
  Result written to Custom Objects (Event Logs + Run Results)
  + Email/notification delivery
```

---

## 🚀 Features

### Salesforce Integration
- **Triggered Flow → Platform Event:** Record changes in Salesforce fire a flow that publishes a platform event, decoupling the trigger from the processing logic.
- **Apex Trigger + Classes:** Platform event trigger invokes Apex classes that build a structured JSON payload (record IDs, org ID, username, merge action ID) and enqueue a Queueable job.
- **Queueable Apex:** Asynchronous execution avoids governor limit violations. Sends a signed HTTP request to AWS API Gateway in batches of up to 100 records per job.
- **JWT + HMAC Authentication:** Every outbound request is signed at the Apex layer, validated at the Lambda layer — no unauthenticated calls reach the backend.

### Custom Objects — Event Logs & Run Results
- **Event Logs:** Track each step of the triggered merge pipeline — request receipt, authentication, license validation, merge progress, and final outcome (success/failure with reason).
- **Run Results:** Store the output of each merge execution — document generated, delivery status, duration, retry count.
- Both objects live in the **client org**, giving users full visibility into their merge activity without leaving Salesforce.

### Custom Settings — Environment Configuration
- Custom settings control behavior per environment (production, sandbox, developer edition) without code changes.
- Configurable flags for: endpoint URLs, feature toggles, bypass options for sandbox testing, and logging verbosity.
- Used to work around environment-specific limits (e.g. Salesforce single-email limits in Developer Editions) without branching code paths.
- Proper error handling propagates from Salesforce configuration errors (missing custom setting values, invalid configurations) all the way through backend service failures — each layer logs a structured reason code to the Event Log object.

### Replay Mechanism
- If a merge job fails at any stage (transient network error, Salesforce timeout, merge service unavailability), the system can replay the job from its last known checkpoint using the stored Event Log data.
- Replay is triggerable manually from the Salesforce UI or automatically on retry threshold breach.
- Prevents data loss and avoids re-triggering the full Apex flow for transient failures.

### Non-Operational Check (Health Verification)
- A **button-click dry-run** feature lets internal teams and admins verify the entire triggered merge pipeline is working without generating a real document.
- Clicking the button fires a test payload through the full stack — Apex → Lambda → Action Service — and returns a pass/fail verdict.
- On completion, results are sent via **email and Slack notification** to the internal team, making it easy to catch regressions after deployments or config changes without monitoring logs manually.

---

## 🗑️ Scheduled Apex — Storage Cleanup

To keep client org storage safe over time, I developed a **configurable Scheduled Apex class** that periodically deletes old Event Logs and Run Results records.

### Configuration Options
The cleanup job is fully configurable via custom objects in the Apsona namespace — no code changes required:

| Option | Description |
|---|---|
| **Target Object** | Select which Apsona namespace object(s) to clean up (Event Logs, Run Results, or others) |
| **Retention Period** | Number of days to retain records before deletion (e.g. keep last 30 days) |
| **Filter Logic** | Add custom SOQL-style filter conditions to restrict which records get deleted |
| **Delete Attachments** | Toggle: delete associated file attachments alongside records, or leave them |
| **Email Notifications** | On completion, send a summary email listing records deleted, any errors, and storage freed |
| **Schedule** | Configurable cron expression for how frequently the job runs |

### Design Notes
- Configurable with **any custom object in the Apsona namespace** — not hardcoded to Event Logs alone. Future objects can be enrolled without code changes.
- Runs as a Schedulable Apex class; can be configured and triggered from the Apsona admin UI.
- Handles bulk deletion within Salesforce DML limits using chunked batch processing.
- Failure in one chunk does not abort the full run — partial completion is logged and reported.

---

## 📊 Backend Dashboard (Internal)

Built an **internal monitoring dashboard** for the Apsona engineering team to observe the health and usage of the triggered merge system in real time.

### What It Shows
- **Job Details:** Current queue depth, in-flight jobs, completed/failed job history with timestamps and org IDs.
- **Failure Rate:** Per-module error breakdown — Lambda validation failures, Gatekeeper rejections, Action Service merge failures.
- **LMO API Usage:** How much of the License Management Org API quota each client org is consuming — useful for catching runaway orgs and planning capacity.
- **Top Clients by Volume:** Ranked view of highest-activity orgs, helping prioritize support and capacity decisions.
- **Service Health:** Live status indicators for Lambda, Gatekeeper, Action Service, and RabbitMQ.

### Access & Auth
- Internal-only, not customer-facing.
- Auth-gated for the Apsona engineering and support team.

---

## 🛠️ Tech Stack

### Salesforce (Client Org)
- Apex (Triggers, Queueable, Schedulable, Classes)
- Salesforce Flow (Flow Builder — trigger detection)
- Platform Events
- Custom Objects (Event Logs, Run Results, Cleanup Config)
- Custom Settings (environment configuration)
- LWC (button-click non-operational check UI)

### AWS Integration Layer
- AWS API Gateway (HTTPS entry point, request routing)
- AWS Lambda (HMAC + JWT validation, license check, job queuing)
- Amazon EventBridge
- Amazon CloudWatch (logging and alerting)
- AWS ECS (containerized Node.js services)
- AWS RDS (PostgreSQL)

### Backend Services (Node.js)
- **Gatekeeper Service:** License and quota validation
- **Action Service:** jsforce-based merge execution with retry logic (3 attempts)
- **Inbound Event Manager:** Routes incoming events to appropriate queues
- RabbitMQ (job queuing), Redis (caching)
- HashiCorp Vault (secrets management)

### Notifications
- Email (merge results, cleanup summaries, non-op check outcomes)
- Slack (non-operational check alerts, internal monitoring)

### CI/CD & Deployment
- Bitbucket Pipelines
- Git tagging for version control and rollback
- AWS ECS + CloudWatch

---

## 🏗️ Architecture

The system is designed for fault tolerance, auditability, and zero data loss:

- **Decoupled trigger layer:** Salesforce flows publish platform events; Apex triggers consume them — the flow author never calls Apex directly.
- **Signed outbound requests:** JWT + HMAC ensures every request from Salesforce to AWS is authenticated and tamper-proof.
- **Two-phase validation at Lambda:** HMAC checked first (reject fast if tampered), then license/quota check — expensive operations never run for invalid requests.
- **Replay-safe event logs:** Every pipeline step writes to a Custom Object before proceeding — if the process fails mid-way, replay can resume from the last checkpoint rather than starting over.
- **Storage-safe design:** Scheduled cleanup job prevents unbounded growth of Event Log and Run Result records in client orgs.
- **Observability:** Internal dashboard + CloudWatch give two complementary views — business-level (jobs/orgs) and infra-level (service health/errors).

---

## 🧪 Testing & Load Considerations

### Environment Isolation via Custom Settings
- Custom settings allow switching between endpoint environments (dev, staging, prod) without code changes.
- Bypass flags in custom settings prevent hitting Salesforce email limits during sandbox testing.

### Salesforce Governor Limits
- `SINGLE_EMAIL_LIMIT_EXCEEDED` in Developer Editions — bypassed using `targetObjectId` instead of external email addresses, controlled via custom setting flag.
- Batch size capped at 100 per Queueable job to stay within heap and CPU limits.
- Bulk delete in cleanup job runs in chunked batches to respect DML row limits.

---

## 📎 References

- [Apsona Triggered Merge](https://apsona.com/trigger-merge)
- [Apsona Triggered Merge Documentation](https://www.apsona.com/docs/help-and-support/trigger-merge/)
- [Salesforce Platform Events](https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/)
- [Salesforce Queueable Apex](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_queueing_jobs.htm)
- [Salesforce Developer Guide](https://developer.salesforce.com/)
