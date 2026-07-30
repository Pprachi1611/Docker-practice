# 🌐 Project 07 – Nginx Reverse Proxy with Docker Compose

A simple multi-container application demonstrating how **Nginx works as a Reverse Proxy** in a Docker environment. The project consists of a static frontend, a Node.js backend, and an Nginx container that routes incoming requests to the appropriate service.

---

## 📌 Project Overview

In this project, a user accesses the application through **Nginx** instead of directly communicating with the frontend or backend containers.

- Requests to `/` are forwarded to the **Frontend**.
- Requests to `/api` are forwarded to the **Backend**.
- Frontend and Backend communicate over Docker's internal network.
- Only Nginx exposes a port to the host machine.

This mimics how modern production applications are deployed.

---

# 🏗️ Architecture

```text
                    Browser
                        │
                http://localhost
                        │
                        ▼
             ┌────────────────────┐
             │  Nginx Reverse Proxy │
             └──────────┬─────────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
 Frontend Container          Backend Container
 (HTML/CSS/JavaScript)      (Node.js + Express)
```

---

# 📂 Project Structure

```text
07-Nginx-Reverse-Proxy/

│── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── Dockerfile
│
│── backend/
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   └── Dockerfile
│
│── nginx/
│   └── nginx.conf
│
│── docker-compose.yml
│── README.md
│── NOTES.md
└── COMMANDS.md
```

---

# 🚀 Technologies Used

- Docker
- Docker Compose
- Nginx
- Node.js
- Express.js
- HTML
- CSS
- JavaScript

---

# ⚙️ How It Works

### Step 1

The user opens

```
http://localhost
```

↓

Request reaches

```
Nginx
```

↓

Nginx checks

```nginx
location /
```

↓

Forwards request to

```
Frontend Container
```

↓

Frontend returns

```
index.html
```

↓

Browser displays the webpage.

---

### Step 2

User clicks

```
Call Backend API
```

↓

JavaScript executes

```javascript
fetch("/api")
```

↓

Browser sends

```
GET /api
```

↓

Nginx checks

```nginx
location /api
```

↓

Forwards request to

```
Backend Container
```

↓

Express handles

```javascript
app.get("/api")
```

↓

Returns

```
Hello from Backend!
```

↓

Browser displays the response.

---

# 🌐 Docker Networking

Docker Compose automatically creates a network.

```text
Docker Network

│

├── frontend

├── backend

└── nginx
```

Containers communicate using **service names** instead of IP addresses.

Example:

```
frontend
```

```
backend
```

Instead of

```
localhost
```

Nginx communicates with

```
http://frontend:80
```

and

```
http://backend:5000
```

using Docker DNS.

---

# 🔀 Nginx Routing

### Frontend

```nginx
location / {

    proxy_pass http://frontend:80;

}
```

All requests beginning with `/` are forwarded to the frontend container.

---

### Backend

```nginx
location /api {

    proxy_pass http://backend:5000;

}
```

All API requests are forwarded to the backend container.

---

# ▶️ Running the Project

### Build and Start

```bash
docker compose up --build -d
```

---

### Stop Containers

```bash
docker compose down
```

---

### View Running Containers

```bash
docker ps
```

---

### View Logs

```bash
docker logs nginx
docker logs frontend
docker logs backend
```

---

# 🌍 Access the Application

Frontend

```
http://localhost
```

Backend (through Nginx)

```
http://localhost/api
```

---

# 📚 Concepts Learned

- Docker Compose
- Multi-container applications
- Reverse Proxy
- Nginx
- Docker Networking
- Docker DNS
- Service Discovery
- Container Communication
- Port Mapping
- Bind Mounts
- Nginx Configuration
- Proxy Pass
- Request Routing

---

# 🎯 Key Learning Outcomes

After completing this project, you will understand:

- How Reverse Proxy works.
- Why Nginx is used in production.
- Difference between frontend and backend routing.
- Docker Compose networking.
- Why containers communicate using service names.
- Why backend services should not be exposed publicly.
- How `proxy_pass` forwards requests.
- How Docker DNS resolves container names.
- How production applications route requests.

---

# 💡 Real-World Use Cases

Reverse proxies are commonly used for:

- Microservices Architecture
- API Gateways
- Load Balancing
- SSL/TLS Termination
- Security
- Request Routing
- Static File Serving

Companies like **Google, Netflix, Amazon, GitHub, and Facebook** use reverse proxies in their production infrastructure.

---

# 📖 Interview Questions Covered

- What is a Reverse Proxy?
- Difference between Forward Proxy and Reverse Proxy.
- Why use Nginx?
- What is `proxy_pass`?
- What is the purpose of `location` blocks?
- Why don't containers communicate using `localhost`?
- What is Docker DNS?
- What is Docker Compose?
- What is `depends_on`?
- Why expose only the Reverse Proxy?

---

# 📸 Expected Output

### Home Page

```
------------------------------------
 Nginx Reverse Proxy Demo

 [ Call Backend API ]

 Waiting...
------------------------------------
```

---

### After Clicking the Button

```
------------------------------------
 Nginx Reverse Proxy Demo

 [ Call Backend API ]

 Hello from Backend!
------------------------------------
```

---

# 🎓 Conclusion

This project demonstrates how to build a **production-style multi-container application** using Docker Compose and Nginx.

Instead of exposing multiple services to users, a single Nginx Reverse Proxy acts as the entry point, routing requests internally to the appropriate containers. This architecture improves security, simplifies deployment, and reflects how modern web applications are commonly deployed in real-world environments.

---
**Project:** 07 – Nginx Reverse Proxy with Docker Compose
```