# 🚀 Profile App using Docker, Node.js & MongoDB

## 📌 Overview

This project is a full-stack profile management application built using Node.js, Express.js, MongoDB, and Docker.

The application allows users to view and edit their profile information. Any updates made to the profile are stored in MongoDB, ensuring the data remains available even after refreshing the page or restarting the application.

All services run inside Docker containers and communicate through a custom Docker network.

---

## 🎯 Project Objectives

- Build a Node.js backend
- Connect Node.js with MongoDB
- Manage MongoDB using Mongo Express
- Learn Docker Networking
- Persist application data
- Containerize the complete application

---

## 🏗️ Architecture

```
                Browser
                    │
                    ▼
           Node.js + Express
                    │
                    ▼
           Docker Network
         (profile-network)
           │           │
           ▼           ▼
      MongoDB     Mongo Express
```

---

## ✨ Features

- View Profile
- Edit Profile
- Save Profile Information
- Store Data in MongoDB
- Retrieve Data from Database
- Persistent Data After Refresh
- Mongo Express Dashboard

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongo Express
- Docker
- Docker Networking

---

## 📂 Folder Structure

```
03-Profile-App
│
├── public
│   ├── index.html
│   └── img.jpg
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

## 🚀 Application Workflow

1. User opens the Profile App.
2. Profile information is loaded from MongoDB.
3. User edits the profile.
4. Node.js receives the request.
5. Data is updated in MongoDB.
6. On page refresh, the updated information is loaded from the database.

---

## 📸 Screenshots

Store screenshots inside the `screenshots` folder.

- Home Page
- Edit Profile
- Updated Profile
- Docker Containers
- Mongo Express Dashboard
- MongoDB Collection

---

## 📚 Skills Learned

- Docker Containers
- Docker Networking
- Port Mapping
- MongoDB Integration
- REST APIs
- Node.js Backend
- Persistent Storage
- Full Stack Docker Deployment

---

## 🚀 Future Improvements

- User Authentication
- Multiple User Profiles
- Profile Picture Upload
- Form Validation
- Docker Compose Deployment
- Kubernetes Deployment

---

## ✅ Status

Completed