---
title: "SWIFT Payment System"
description: "Overview and contributions to the SWIFT Payment System project."
pubDate: "2022-10-01"
heroImage: "/projects-placeholder-swift.png"
---

## Society for Worldwide Interbank Financial Telecommunication

### Overview
The **SWIFT (Society for Worldwide Interbank Financial Telecommunication)** network is the leading global provider of secure financial messaging services. It connects over 11,000 banks and financial institutions across more than 200 countries, enabling standardized and reliable communication for international payments.

SWIFT itself does not transfer money but provides a secure messaging platform that allows banks to send and receive instructions for transferring funds. Every institution is assigned a **unique SWIFT/BIC code**, which ensures that messages are routed correctly.

**How it works:**
1. A customer initiates an international transfer at their local bank.
2. The bank formats the message using SWIFT ISO 15022/ISO 20022 standards.
3. The message is securely transmitted through the SWIFT network.
4. The destination bank receives the instruction and credits the beneficiary’s account.
5. Settlement is managed by correspondent or intermediary banks when required.

**Key features:**
- Global reach and standardization.  
- ISO-compliant structured messages (MT / MX formats).  
- Secure and encrypted network ensuring confidentiality and integrity.  
- Supports payments, securities, treasury, and trade transactions.  

**References:**
- [SWIFT official site](https://www.swift.com/)  
- [Wikipedia - SWIFT](https://en.wikipedia.org/wiki/SWIFT)  

---

### My Contributions
At **Pratishthan Software Ventures**, I contributed to the development and testing of the **SWIFT payment system** modules:

- **Designed and implemented charge calculations**: Ensured accurate computation of transaction charges for both domestic and international transfers.  
- **Developed partTrans (partial transaction) creations**: Enabled breaking down large payments into smaller, manageable transactions for better control and compliance.  
- **Component Testing for Charges**: Authored comprehensive test strategies for charges, improving reliability and catching errors early.  
- **Enhanced Transaction Accuracy**: Optimized processing flows to reduce discrepancies and maintain compliance with SWIFT standards.  

---

### Tech Stack
- **Backend Development:** Node.js, LoopBack.io, JavaScript  
- **Testing Frameworks:** Mocha, Unit Testing  
- **Data Formats:** ISO Standards, JSON  
- **Messaging/Integration:** RabbitMQ  
- **Databases:** Redis (caching), PostgreSQL (where required)  
- **Other Tools:** Node-RED, Microservices Architecture  

---
