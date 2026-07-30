# 📘 Project 07 – Nginx Reverse Proxy with Docker Compose
# Commands Used

---

# 1. Build and Start All Services

```bash
docker compose up --build -d
```

Builds images (frontend & backend), creates containers, creates the Docker network, and starts all services.

---

# 2. Stop and Remove All Services

```bash
docker compose down
```

Stops and removes all containers and the Docker network created by Docker Compose.

---

# 3. View Running Containers

```bash
docker ps
```

Shows all running containers.

---

# 4. View Container Logs

### Nginx

```bash
docker logs nginx
```

### Frontend

```bash
docker logs frontend
```

### Backend

```bash
docker logs backend
```

Used to check container output and debug issues.

---

# 5. Restart All Services

```bash
docker compose restart
```

Restarts all containers.

---

# 6. Stop All Services

```bash
docker compose stop
```

Stops all running containers without removing them.

---

# 7. Start Existing Services

```bash
docker compose start
```

Starts previously stopped containers.

---

# 8. Rebuild After Code Changes

```bash
docker compose up --build -d
```

Rebuilds the images after modifying the frontend, backend, or Dockerfiles.

---

# Command Flow

```text
docker compose up --build -d
            │
            ▼
     Build Images
            │
            ▼
    Create Network
            │
            ▼
   Create Containers
            │
            ▼
   Start All Services
            │
            ▼
 Open http://localhost
            │
            ▼
     Test Application
            │
            ▼
docker compose down
```