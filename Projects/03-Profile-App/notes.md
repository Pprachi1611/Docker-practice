# Notes

## Project Objective

The objective of this project is to build a complete Dockerized CRUD web application where users can manage profile information stored in MongoDB.

Unlike frontend-only applications, all data is stored permanently in the database, allowing information to remain available after page refreshes and application restarts.

---

# Components

## Frontend

- HTML
- CSS
- JavaScript

Responsible for user interaction.

---

## Backend

Node.js with Express.

Responsible for

- Serving webpages
- Creating REST APIs
- Handling CRUD operations
- Validating requests

---

## Database

MongoDB stores

- Name
- Email
- Phone
- Age
- City
- Interest
- Occupation

---

## Mongo Express

Provides a graphical interface to

- View databases
- View collections
- View documents
- Edit data
- Delete data

---

# Docker Containers

Container 1

Profile App

Container 2

MongoDB

Container 3

Mongo Express

All containers communicate using a Docker bridge network created by Docker Compose.

---

# Docker Concepts Practiced

- Dockerfile
- Docker Images
- Docker Containers
- Port Mapping
- Docker Compose
- Environment Variables
- Docker Networks

---

# REST APIs

GET

Retrieve users.

POST

Create users.

PUT

Update users.

DELETE

Remove users.

---

# Data Flow

Browser

↓

JavaScript Fetch API

↓

Express Server

↓

MongoDB Driver

↓

MongoDB

↓

JSON Response

↓

Browser

---

# Validation

Frontend

- Required fields
- Valid email
- Numeric age

Backend

- Duplicate email
- Missing values
- Invalid ObjectId
- Database exceptions

---

# Persistence

User information is stored in MongoDB.

Refreshing the browser does not remove data because the frontend loads information from the database each time the page loads.

---

# Important Learnings

- CRUD API Development
- MongoDB CRUD Operations
- Docker Compose
- Container Networking
- Express Routing
- Async/Await
- Fetch API
- Full stack development