# ActionWatch – AI-Powered Incident Response Platform

> An enterprise-grade incident response platform that combines real-time service monitoring, AI-powered incident analysis, automated health checks, and collaborative War Rooms to help teams detect, investigate, and resolve production incidents faster.



---

## Overview

Modern software systems require continuous monitoring and rapid incident response.

ActionWatch is an AI-powered incident management platform inspired by modern SRE (Site Reliability Engineering) workflows. It automatically monitors services, detects failures, creates incidents, provides AI-generated root cause analysis, enables real-time collaboration through War Rooms, and generates postmortem reports after incident resolution.

---

## Features

### Authentication

- JWT authentication
- Refresh token rotation
- HTTP-only cookies
- Google OAuth login
- Role-based access control (RBAC)
- Session management

### Service Monitoring

- Create and manage monitored services
- Configurable health check intervals
- HTTP status validation
- Response time tracking
- Failure threshold detection
- Automatic service status updates

### Incident Management

- Automatic incident creation
- Manual incident creation
- Incident lifecycle management
- Severity levels (P0–P3)
- Status tracking
- Incident timelines
- Responder assignment

### AI Features

Powered by Google Gemini AI:

- Root cause analysis
- AI recommendations
- Incident summary generation
- AI postmortem generation
- Similar incident retrieval (RAG)

### Real-Time Collaboration

Built with Socket.IO:

- Live War Room
- Timeline updates
- Presence tracking
- Live responder updates
- Real-time notifications

### Analytics

- Incident statistics
- Service availability
- Mean time to resolution (MTTR) tracking
- Resolution metrics
- Dashboard insights

---

## Architecture

```
                ┌──────────────┐
                │ React Client │
                └──────┬───────┘
                       │
             REST API + Socket.IO
                       │
        ┌──────────────▼──────────────┐
        │      Express Backend        │
        └──────────────┬──────────────┘
                       │
     ┌─────────────────┼─────────────────┐
     │                 │                 │
 MongoDB          Gemini AI        Monitoring
 Database             API           Scheduler
```

---

## Tech Stack

### Frontend

- React.js
- React Router
- React Query
- Tailwind CSS
- Axios
- Socket.IO Client
- React Hook Form
- Zod
- Sonner

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Google OAuth
- Socket.IO
- Node Cron
- Nodemailer

### AI

- Google Gemini API
- Retrieval Augmented Generation (RAG)

### Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

---

## Incident Workflow

```
Health Check
      │
      ▼
Service Failure
      │
      ▼
Failure Threshold Reached
      │
      ▼
Incident Created
      │
      ▼
AI Root Cause Analysis
      │
      ▼
War Room Collaboration
      │
      ▼
Incident Resolved
      │
      ▼
AI Postmortem Generated
```

---

## User Roles

| Role | Permissions |
|------|-------------|
| Owner | Full access |
| Admin | Manage users and services |
| Responder | Resolve incidents |
| Viewer | Read only |

---

## Screenshots

Add screenshots of:

- Dashboard
- Incident List
- War Room
- Analytics
- Service Monitoring
- AI Analysis

---

## Future Improvements

- Kubernetes integration
- Docker monitoring
- Slack notifications
- Microsoft Teams integration
- SMS alerts
- Prometheus metrics
- Grafana dashboard
- Multi-tenant organizations
- Background job queue
- AI chat assistant





---

## Author

**Abhishek Namdeo**

B.Tech Computer Science Engineering
Backend Developer | MERN Stack | AI Integration | Full Stack Developer

