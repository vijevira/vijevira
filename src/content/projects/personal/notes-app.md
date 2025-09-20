---
title: "Notes App"
description: "Simple notes app"
pubDate: "2024-08-01"
tags: ["Express", "Node.js", "HTML", "Google Keep", "CSS", "Authentication", "CRUD", "JavaScript", "Web App"]
heroImage: "/projects-notes.png"
---

# Notes Web Application (Google Keep Inspired)

## 📌 Overview
This project is a **desktop web application for managing personal notes**, inspired by Google Keep. It enables users to create, organize, and manage their notes efficiently with features like tagging, archiving, and reminders.  

The application is built with a **Node.js backend** for APIs and authentication, while the frontend is developed without using any frontend frameworks, ensuring a lightweight and fast experience.

👉 You can try out the live deployment here: [notes.domain.in](https://notes.domain.in)

---

## 🚀 Features

### Core Features
- **User Authentication & Profile**
  - Secure login and signup.  
  - Sync notes across sessions.  

- **Notes Management**  
  - Create, edit, and delete notes.  
  - Assign **up to 9 tags** per note.  
  - Toggle between multiple **background colors** for personalization.  

- **Search & Organization**  
  - Search within all notes.  
  - Special **Label View** to display all notes with a specific label.  
  - Archive notes for later use.  
  - Trash view for notes deleted in the last 30 days.  

### Bonus Features
- **Reminders**  
  - Special view to display all notes with upcoming due dates.  

---

## 🛠️ Tech Stack
- **Backend:** Node.js (API, Authentication, CRUD operations)  
- **Frontend:** Vanilla JavaScript, HTML, CSS (no frontend framework)  
- **Database:** (Configurable – e.g., PostgreSQL, MongoDB, or JSON-based store)  
- **Authentication:** Session-based / JWT  

---

## 🏗️ Architecture
- **Backend:**  
  - REST APIs for authentication, notes CRUD, labels, archive, trash, and reminders.  
  - Middleware for user sessions & access control.  

- **Frontend:**  
  - Vanilla JavaScript-based rendering.  
  - DOM manipulation for notes creation, color toggle, and search.  
  - Responsive UI with dynamic sections (All, Archived, Trash, Labels, Reminders).  

---

## 📂 Key Features in Action
1. **Create Note** → Add a title, description, tags, and background color.  
2. **Search Notes** → Real-time filtering by text or label.  
3. **Archive Notes** → Hide less important notes without deleting them.  
4. **Trash Notes** → Soft delete mechanism, auto-clear after 30 days.  
5. **Reminders** → Set due date and view all upcoming notes in one place.  

---

## 📎 References
- [Google Keep](https://keep.google.com/) – Inspiration for UI/UX.  
- [Node.js Documentation](https://nodejs.org/en/docs/) – Backend reference.  
- [MDN Web Docs](https://developer.mozilla.org/en-US/) – For Vanilla JavaScript & DOM APIs.  
