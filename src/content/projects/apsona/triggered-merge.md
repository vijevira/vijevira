---
title: "Apsona Triggered Merge"
description: "The Triggered Merge is one of the most powerful automation features in Apsona for Salesforce. It allows users to automatically generate documents (such as PDFs, Word documents, or Excel files) and send emails based on changes in Salesforce records (like an opportunity closing or a case being created)."
pubDate: "2026-04-01"
tags: ["Salesforce", "Apex", "Apsona", "Integration", "SOAP API", "Node.js", "Queueable"]
heroImage: "/apsona.png"
---

# Apsona Triggered Merge

## 📌 Overview

The Triggered Merge is one of the most powerful automation features in Apsona for Salesforce. It enables users to automatically generate documents (such as PDFs, Word documents, or Excel files) and send emails based on changes in Salesforce records, such as an opportunity closing or a case being created. This system captures record updates in Salesforce, processes them asynchronously through a series of backend services, and merges data into predefined templates for seamless document generation and delivery.

As the lead developer, I was responsible for the end-to-end development and deployment of this integration from scratch, ensuring robust, scalable, and secure automation that handles high-volume data processing while adhering to Salesforce limits and best practices.

## 🚀 Features

### Core Capabilities
- **Automated Merges:** Trigger-based execution on record updates or creation, enabling real-time document generation.
- **Payload Serialization:** Converts Salesforce data into JSON payloads for efficient asynchronous processing by Apsona's inbound event manager.
- **Exception Handling Framework:** Standardized error handling through custom classes to prevent limits from crashing background threads.
- **Limit Safeguards:** Incorporates bypass mechanisms, such as using `targetObjectId` instead of external email addresses, to avoid hitting Salesforce's single-email limits.
- **Batch Processing:** Handles merge actions in batches of 100 records for optimal performance and limit management.
- **Authentication & Security:** Implements JWT and HMAC for secure API communications between Salesforce and AWS services.
- **Comprehensive Logging:** Detailed event logging for debugging, including request receipt, authentication status, quota validation, and merge outcomes.
- **Backend Dashboard:** Real-time monitoring of job statuses, service health, usage analytics, and error rates.

## 👨‍💻 My Role and Responsibilities

I led the full development lifecycle of this integration, from initial design to production deployment. My efforts included:

### Salesforce Development
- **Platform Event Creation:** Designed and implemented Salesforce platform events to capture record changes.
- **Apex Triggers and Flows:** Developed Apex triggers integrated with Salesforce flows to initiate merge processes.
- **Payload Creation:** Built logic to serialize record IDs, orgId, username, and merge action IDs into structured payloads.
- **Queueable Apex Jobs:** Implemented asynchronous Queueable processes to send secure requests (with JWT and HMAC) to AWS API Gateway in batches of 100.

### Backend Services
- **API Gateway Configuration:** Set up AWS API Gateway to invoke Lambda functions securely.
- **Lambda Function Development:** Created serverless functions for request validation using both HMAC and JWT, job status management, and queue messaging for quota and license checks.
- **Gatekeeper Service:** Developed a validation service to check user licenses and quotas before processing merge actions, updating job statuses accordingly.
- **Action Service:** Built the core processing service that connects to Salesforce via jsforce, performs merges, implements retry logic (up to 3 attempts), and handles failures gracefully.

### Logging and Monitoring
- **Custom Event Logging:** Implemented comprehensive log handling using custom Salesforce objects to track events such as request receipt, authentication success/failure, quota validation results, document generation progress, and merge completion or failure with detailed reasons.
- **Backend Dashboard:** Designed and developed a monitoring dashboard to track job details, service health, queued/completed/failed job summaries, top clients by usage, error rates by module, and LMO API usages. Included a one-click dry run feature for testing.

### Infrastructure and Deployment
- **End-to-End Deployment:** Managed deployment across AWS services, including ECS containers, CloudWatch for monitoring, Bitbucket pipelines for CI/CD, and RDS for data persistence.
- **Security and Configuration:** Integrated HashiCorp Vault for secrets management, EventBridge for event-driven architecture, and Redis/RabbitMQ for queuing and caching.

## 🛠️ Tech Stack
- **Platform:** Salesforce Apex (SOAP API v66.0, Queueable Interface)
- **Integration Layer:** Apsona Inbound Event Manager
- **External Integration:** Postman/cURL for API testing and REST/SOAP debugging
- **Error Handling:** Custom exception management classes
- **Backend:** Node.js, PostgreSQL, AWS Lambda, AWS API Gateway, RabbitMQ, Redis, Express.js, HashiCorp Vault, EventBridge
- **Deployment:** AWS (ECS, CloudWatch, RDS), Bitbucket Pipelines, Git Tagging

## 🏗️ Architecture

The architecture is designed for scalability, security, and fault tolerance:

- **Event Generation:** Salesforce triggers or flows detect record changes and generate outbound payloads.
- **Asynchronous Processing:** Queueable Apex jobs handle background execution, avoiding CPU timeouts and governor limits.
- **Multi-Service Backend:**
  - **API Gateway:** Entry point for secure invocations.
  - **Lambda:** Validation and job queuing.
  - **Gatekeeper:** License and quota enforcement.
  - **Action Service:** Core merge processing with retries.
- **Error Handling:** Standardized logging and exception conversion for clean failure reporting in Apex Jobs.

## 🏗️ Development & Deployment Process

### Key Classes & Components
- **`ErrorHandler.cls`:** Global utility for exception management and standardization.
- **`ApsonaTriggerMergeServiceQA.cls`:** Queueable job class for safe asynchronous execution and error catching.
- **Apex Triggers:** Event-driven triggers configured via Salesforce flows.

### Deployment Strategy
- Utilized Bitbucket pipelines for automated builds and deployments.
- Leveraged AWS ECS for containerized services and CloudWatch for logging and monitoring.
- Implemented Git tagging for version control and rollback capabilities.

## 🧪 Load Testing & Challenges

### Handling Salesforce Limits
During load testing in Developer Editions, I encountered and resolved the `SINGLE_EMAIL_LIMIT_EXCEEDED` error (capped at 15 external emails/day). Key learnings:
- **Limit Metrics:** Bounced emails deduct from the limit post-delivery.
- **Bypass Techniques:** Used custom settings for internal users for environment switch.
- **Batch Optimization:** Processed records in batches to manage API call limits effectively.

## 📎 References
- [Apsona Triggered Merge](https://apsona.com/trigger-merge)
- [Apsona Triggered Merge Documentation](https://www.apsona.com/docs/help-and-support/trigger-merge/)
- [Salesforce Developer Guide](https://developer.salesforce.com/)