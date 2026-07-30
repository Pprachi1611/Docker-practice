# 📘 Project 07 - Nginx Reverse Proxy with Docker Compose

---

# What You Will Learn

After completing this project you should understand:

- What is a Reverse Proxy
- Why Reverse Proxy is used
- Difference between Reverse Proxy and Forward Proxy
- How Nginx works
- Docker Networking
- Docker DNS
- Docker Compose Networking
- Service Discovery
- Container Communication
- Request Routing
- proxy_pass
- location blocks
- depends_on
- Production Architecture

---

# Why Do We Need a Reverse Proxy?

Suppose we have a simple application.

```text
Browser
   │
   ├────────► Frontend (localhost:3000)

   └────────► Backend (localhost:5000)
```

Problems:

- Browser knows backend URL.
- Backend is publicly exposed.
- Multiple ports need to be opened.
- Difficult to manage many services.

Imagine a project with

- Frontend
- Backend
- MongoDB
- Redis
- RabbitMQ
- Authentication Service

Would users access

```text
localhost:3000

localhost:5000

localhost:6379

localhost:27017
```

No.

Instead users should communicate with **only one server**.

That server is called a **Reverse Proxy**.

---

# What is a Reverse Proxy?

A Reverse Proxy is a server that sits **between clients and backend servers**.

It receives client requests and forwards them to the appropriate backend service.

```text
Browser

      │

      ▼

Reverse Proxy

   ┌──────┴───────┐

   ▼              ▼

Frontend      Backend
```

The client never communicates directly with backend services.

---

# Advantages of Reverse Proxy

✔ Single Entry Point

Users access only one URL.

```text
http://localhost
```

instead of

```text
localhost:3000

localhost:5000
```

---

✔ Better Security

Backend remains hidden.

Users cannot directly access backend services.

---

✔ Load Balancing

Reverse Proxy can distribute requests among multiple servers.

```text
          Nginx

      ┌────┼────┐

      ▼    ▼    ▼

 Backend1 Backend2 Backend3
```

---

✔ SSL Termination

HTTPS certificates are installed only on Nginx.

Backend containers can continue using HTTP internally.

---

✔ Centralized Routing

Nginx decides

- where requests go
- which service handles them
- how responses are returned

---

# Reverse Proxy vs Forward Proxy

## Reverse Proxy

Works for servers.

```text
Browser

↓

Reverse Proxy

↓

Backend Server
```

The client doesn't know the backend.

---

## Forward Proxy

Works for clients.

```text
User

↓

Forward Proxy

↓

Internet
```

Used for

- anonymity
- filtering
- blocking websites

---

# Why Nginx?

Nginx is one of the fastest web servers.

It can act as

- Web Server
- Reverse Proxy
- Load Balancer
- API Gateway
- SSL Terminator

Large companies using Nginx include

- Netflix
- GitHub
- Dropbox
- Cloudflare
- Airbnb

---

# Project Architecture

Our application contains three containers.

```text
                    Browser
                        │
                        ▼
                 http://localhost
                        │
                        ▼
               Nginx Reverse Proxy
                 ┌────────┴────────┐
                 ▼                 ▼
          Frontend Container   Backend Container
```

Notice

Only Nginx is exposed.

Frontend and Backend remain private.

---

# Docker Compose Network

Docker Compose automatically creates a bridge network.

```text
Docker Network

│

├── frontend

├── backend

└── nginx
```

All containers connected to this network can communicate.

No IP addresses are required.

---

# Docker DNS

Docker Compose provides built-in DNS.

Every service name becomes a hostname.

Example

frontend service

↓

Hostname becomes

```text
frontend
```

Backend service

↓

Hostname becomes

```text
backend
```

Nginx communicates using

```text
http://frontend:80

http://backend:5000
```

instead of IP addresses.

This feature is called **Docker DNS**.

---

# Why Not localhost?

This is one of the most common interview questions.

Suppose we are inside the Nginx container.

```text
localhost
```

means

```text
Nginx Container
```

NOT

```text
Backend Container
```

Every container has its own network namespace.

Think of containers as separate computers.

```text
Computer A

localhost

↓

Computer A
```

```text
Computer B

localhost

↓

Computer B
```

Docker containers behave exactly the same way.

Therefore,

❌ Wrong

```text
proxy_pass http://localhost:5000;
```

✅ Correct

```text
proxy_pass http://backend:5000;
```

Docker automatically resolves

```text
backend
```

to the backend container.

---

# Docker Compose Services

Our compose file contains three services.

```text
Frontend

Backend

Nginx
```

Compose performs

Read compose file

↓

Build Images

↓

Create Network

↓

Create Containers

↓

Connect Containers

↓

Start Containers

Automatically.

---

# Service Discovery

Containers never search by IP.

Instead

Docker finds services using names.

```text
frontend

↓

Container IP

↓

Connected
```

If backend container restarts,

its IP changes.

Docker DNS updates automatically.

No configuration changes are required.

---

# Theory Summary

Reverse Proxy

↓

Receives client requests

↓

Decides destination

↓

Forwards request

↓

Receives response

↓

Returns response to client

Without exposing backend servers.

---
# Nginx Configuration (nginx.conf)

The heart of this project is the **nginx.conf** file.

Nginx reads this file when it starts.

Based on this configuration, Nginx decides:

- Which requests should be handled.
- Where they should be forwarded.
- Which backend service should receive the request.

---

# nginx.conf

```nginx
events {}

http {

    server {

        listen 80;

        location / {

            proxy_pass http://frontend:80;

        }

        location /api {

            proxy_pass http://backend:5000;

        }

    }

}
```

---

# Understanding Every Block

## 1. events {}

```nginx
events {}
```

This block manages connections between clients and Nginx.

For small projects we usually leave it empty.

Think of it as:

```text
Nginx Startup Requirements

↓

events block must exist
```

---

## 2. http {}

```nginx
http {

}
```

Everything related to HTTP goes inside this block.

Examples:

- server
- location
- proxy_pass
- headers
- compression

---

## 3. server {}

```nginx
server {

}
```

Represents one web server.

You can have multiple server blocks.

Example

```text
example.com

↓

Server Block 1
```

```text
api.example.com

↓

Server Block 2
```

Our project has only one server.

---

## 4. listen 80

```nginx
listen 80;
```

Meaning

```text
Nginx

↓

Listen on Port 80
```

Whenever someone opens

```
http://localhost
```

the request reaches Nginx.

---

# Understanding location

This is the most important concept.

A location block tells Nginx

> "If the request URL matches this path, execute the following instructions."

General format

```nginx
location PATH {

}
```

---

## location /

```nginx
location / {

    proxy_pass http://frontend:80;

}
```

Matches

```
/
```

```
/index.html
```

```
/style.css
```

```
/script.js
```

```
/images/logo.png
```

Basically every normal webpage request.

---

Flow

```text
Browser

↓

GET /

↓

Nginx

↓

location /

↓

Frontend Container

↓

HTML

↓

Browser
```

---

## location /api

```nginx
location /api {

    proxy_pass http://backend:5000;

}
```

Matches

```
/api
```

```
/api/users
```

```
/api/login
```

```
/api/products
```

Flow

```text
Browser

↓

GET /api

↓

Nginx

↓

location /api

↓

Backend

↓

Express

↓

Response

↓

Browser
```

---

# proxy_pass

This is the command that actually forwards requests.

Syntax

```nginx
proxy_pass URL;
```

Example

```nginx
proxy_pass http://backend:5000;
```

Meaning

```text
Don't process this request yourself.

↓

Forward it

↓

Backend Container
```

Nginx behaves like a middleman.

---

# Why frontend:80 ?

```nginx
proxy_pass http://frontend:80;
```

frontend

↓

Docker Service Name

↓

Docker DNS

↓

Frontend Container

↓

Port 80

No IP address is required.

---

# Why backend:5000 ?

```nginx
proxy_pass http://backend:5000;
```

Docker automatically resolves

```
backend
```

to the backend container.

---

# Why NOT localhost?

Suppose we write

```nginx
proxy_pass http://localhost:5000;
```

Inside Nginx

```
localhost
```

means

```
Nginx Container
```

NOT

```
Backend Container
```

Therefore Nginx would search for a backend inside itself.

Result

```
Connection Refused
```

Correct approach

```nginx
proxy_pass http://backend:5000;
```

---

# Docker Compose

Our compose file

```yaml
version: "3.9"

services:

  frontend:
    build: ./frontend

  backend:
    build: ./backend

  nginx:
    image: nginx:alpine

    ports:
      - "80:80"

    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf

    depends_on:
      - frontend
      - backend
```

---

# Understanding Each Property

## build

```yaml
build: ./frontend
```

Compose goes inside

```
frontend/
```

↓

Reads

```
Dockerfile
```

↓

Builds Image

---

## image

```yaml
image: nginx:alpine
```

Instead of building an image,

Compose downloads

```
nginx:alpine
```

from Docker Hub.

---

## ports

```yaml
ports:
  - "80:80"
```

Meaning

```text
Host Port 80

↓

Container Port 80
```

Browser

↓

localhost

↓

Nginx

---

## volumes

```yaml
volumes:

- ./nginx/nginx.conf:/etc/nginx/nginx.conf
```

Meaning

```text
Project Folder

↓

nginx.conf

↓

Mounted

↓

Container

↓

/etc/nginx/nginx.conf
```

Nginx now uses our configuration instead of its default configuration.

---

## depends_on

```yaml
depends_on:

- frontend

- backend
```

Meaning

```text
Start Frontend

↓

Start Backend

↓

Start Nginx
```

This controls **startup order**.

**Important:** `depends_on` does **not** guarantee that the frontend or backend is fully ready to accept requests. It only ensures their containers are started before Nginx. For readiness, Docker Compose supports **health checks**, which are commonly used in production.

---

# Complete Request Lifecycle

## User opens website

```text
Browser

↓

GET /

↓

Nginx

↓

location /

↓

proxy_pass

↓

Frontend

↓

index.html

↓

Nginx

↓

Browser
```

Website appears.

---

## User clicks button

JavaScript

```javascript
fetch("/api")
```

↓

Browser

↓

GET /api

↓

Nginx

↓

location /api

↓

proxy_pass

↓

Backend

↓

Express Route

↓

Hello from Backend!

↓

Nginx

↓

Browser

↓

Update HTML

---

# How JavaScript Talks to Backend

JavaScript

```javascript
fetch("/api")
```

Notice

It never says

```
localhost:5000
```

Instead

```
/api
```

Browser sends request to Nginx.

Nginx decides

```
↓

Backend
```

JavaScript doesn't know where backend actually exists.

---

# Production Architecture

Development

```text
Browser

├── localhost:3000

└── localhost:5000
```

Production

```text
Browser

↓

Nginx

↓

Frontend

or

Backend
```

Only one public entry point.

This is why Reverse Proxy is used almost everywhere.

---

# Common Mistakes

❌ Using

```nginx
proxy_pass http://localhost:5000;
```

Instead use

```nginx
proxy_pass http://backend:5000;
```

---

❌ Forgetting to expose Nginx

Without

```yaml
ports:
  - "80:80"
```

Browser cannot access the application.

---

❌ Editing nginx.conf without recreating the container

After changing the configuration

```bash
docker compose up --build -d
```

or

```bash
docker compose restart
```

---

# Quick Revision

```text
Browser

↓

Nginx

↓

location

↓

proxy_pass

↓

Docker DNS

↓

Frontend / Backend

↓

Response

↓

Browser
```

---

# Key Takeaways

- Nginx acts as a Reverse Proxy.
- `location` matches incoming request paths.
- `proxy_pass` forwards requests to another service.
- Docker Compose creates a shared network automatically.
- Docker DNS allows containers to communicate using service names.
- `localhost` inside a container refers only to that container.
- Only Nginx should expose a public port.
- This architecture closely resembles real-world production deployments.