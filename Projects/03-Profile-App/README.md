# 🚀 Profile App - Dockerized CRUD User Management System

A complete full-stack CRUD User Management System built using Node.js, Express.js, MongoDB, Docker, and Mongo Express.

The application allows users to create, view, update, search, and delete user profiles through a modern web interface. All user data is stored permanently in MongoDB, ensuring persistence across page refreshes and container restarts.

---

# Project Overview

This project demonstrates how a complete web application can be containerized using Docker and connected to a MongoDB database. The backend exposes REST APIs that interact with MongoDB using the official MongoDB Node.js Driver, while the frontend communicates with these APIs using the Fetch API.

Mongo Express is included to provide a graphical interface for managing and inspecting the MongoDB database.

---

# Features

- Create User
- View Users
- Update User
- Delete User
- Search Users
- Responsive UI
- Client-side Validation
- Server-side Validation
- REST API
- MongoDB Data Persistence
- Dockerized Application
- Mongo Express Integration
- Docker Compose Setup

---

# Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- Docker
- Docker Compose
- Mongo Express

---

# Folder Structure

```

03-Profile-App
│
├── public
│ ├── index.html
│ ├── style.css
│ ├── script.js
│ └── img.jpg
│
├── screenshots
│
├── server.js
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── .env
├── README.md
├── commands.md
└── notes.md

```

---

# Application Workflow

Browser

↓

Frontend (HTML, CSS, JavaScript)

↓

Express.js Server

↓

REST APIs

↓

MongoDB

↓

Mongo Express

---

# Docker Services

## Profile App

Runs the Node.js application.

## MongoDB

Stores all user information.

## Mongo Express

Provides a web interface to manage MongoDB.

---

# Getting Started

Install dependencies

```bash
npm install
```

Build and start all containers

```bash
docker compose up -d --build
```

Open the application

```
http://localhost:3000
```

Open Mongo Express

```
http://localhost:8081
```

---

# Screenshots

Add screenshots inside the screenshots folder.

Suggested screenshots

- Dashboard
- Add User
- Edit User
- Search User
- Mongo Express
- Docker Containers
- Docker Images
- Docker Network
- API Testing

---

# Learning Outcomes

- CRUD Operations
- Express.js REST APIs
- MongoDB Integration
- Docker Images
- Docker Containers
- Docker Networking
- Docker Compose
- Environment Variables
- Fetch API
- Client-Server Architecture

---

# Future Improvements

- Authentication
- JWT Authorization
- Profile Images
- Password Encryption
- Kubernetes Deployment
- CI/CD Pipeline

---

# Author

Prachi Patil