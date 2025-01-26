
# Test Task: E-commerce Landing Page & Analytics

A multi-service setup demonstrating a typical development process for an e-commerce landing page, including responsive design, dynamic content, and analytics logging in a separate backend service.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Prerequisites](#prerequisites)
- [Quick Start (Docker)](#quick-start-docker)
- [Manual Setup (Node)](#manual-setup-node)
- [Usage](#usage)
- [Technology Stack](#technology-stack)

---

## Overview
The main goal is to replicate a normal setup and development process for creating and measuring the performance of a dynamic landing page. The project consists of:
1. **Landing Page Service** (Frontend)
2. **Analytics Service** (Backend)

Both services are **containerized** (Docker) and can be run locally via **docker-compose**.

---

## Features
1. **Dynamic Landing Page**
   - **Server-Side Rendering** using EJS for SEO.
   - **Dynamic Content** parameterized by `breakLevel` (e.g., “Break 80”).
   - **Responsive Design** matches a Figma prototype.
   - **Interactive Video** with timestamps (5s, 14s, 24s), a vertical progress bar, and collapsible cards.

2. **Analytics Service**
   - **Standalone** Express server on port 4000.
   - Logs events (`Page View`, `Full Video Watch`, etc.) in MongoDB.
   - Captures IP, user agent, page URL, user ID, and timestamps.
   - Provides `/events` endpoint to view stored analytics.

3. **Containerization**
   - Each service has its own **Dockerfile**.
   - `docker-compose.yml` orchestrates multi-container setup for local testing.

---

## Folder Structure
```bash
Test-task-landing-page
├── frontend
│   └── landing-page-service
│       ├── public/          # CSS, Images, Video
│       ├── views/           # EJS templates
│       ├── package.json
│       ├── server.js        # Express web server
│       ├── Dockerfile
│       └── ...
├── backend
│   └── analytics-service
│       ├── package.json
│       ├── server.js
│       ├── Dockerfile
│       └── ...
└── docker-compose.yml
```

---

## Prerequisites
- **Docker** and **docker-compose** (for the quick start).
- **Node.js (16+)** and **MongoDB** (if running manually).

---

## Quick Start (Docker)

1. **Clone** the repository:
   ```bash
   git clone https://github.com/Lauraatii/Test-task-landing-page.git
   cd Test-task-landing-page
   ```

2. **Run** Docker Compose:
   ```bash
   docker-compose up --build
   ```
   - Landing Page is available on **http://localhost:3001** (mapped from port 3000).
   - Analytics Service is on **http://localhost:4000**.

3. **Test**:
   - Open [http://localhost:3001](http://localhost:3001) to see the landing page.
   - Browse [http://localhost:4000/events](http://localhost:4000/events) to see logged events.

---

## Manual Setup (Node)

If you prefer running each service without Docker:

1. **Install** Dependencies

   **Landing Page Service**:
   ```bash
   cd frontend/landing-page-service
   npm install
   npm start
   # Runs at http://localhost:3000
   ```

   **Analytics Service**:
   ```bash
   cd backend/analytics-service
   npm install
   npm start
   # Runs at http://localhost:4000
   ```

2. **Visit** the landing page on [http://localhost:3000](http://localhost:3000), and analytics logs on [http://localhost:4000/events](http://localhost:4000/events).

---

## Usage

1. **Landing Page**  
   - [http://localhost:3001?breakLevel=Break%2080](http://localhost:3001?breakLevel=Break%2080) adjusts dynamic text.  
   - Responsive layout, using media queries for smaller screens.

2. **Analytics**  
   - Logs events for `Page View` (on page load) and `Full Video Watch` (when the video ends).  
   - Captures user ID (via localStorage), IP (in the backend), user agent, timestamps, and page URL.

3. **Interactive Video**  
   - Vertical progress bar on the left side.  
   - Three timestamps highlight collapsible cards at 5s, 14s, and 24s.

---

## Technology Stack
- **Frontend**: Node.js, Express, EJS, Docker
- **Backend**: Node.js, Express, MongoDB (Mongoose), Docker
- **Styling**: CSS (responsive)
- **Deployment**: Docker Compose for multi-container orchestration

---

**Thank you for reviewing this test assignment!**
