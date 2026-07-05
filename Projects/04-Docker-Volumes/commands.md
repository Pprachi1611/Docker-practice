# 📘 Docker Volumes Project - Commands Reference

This document contains all the Docker commands used in **Project 04 – Docker Volumes (Notes App)**.

---

# 1. Build Docker Image

```bash
docker build -t notes-app .
```

---

# 2. List Docker Images

```bash
docker images
```

---

# 3. Run Container (Without Volume)

```bash
docker run -d --name notes-app -p 3000:3000 notes-app
```

---

# 4. Create Docker Volume

```bash
docker volume create notes-data
```

---

# 5. List Docker Volumes

```bash
docker volume ls
```

---

# 6. Inspect Docker Volume

```bash
docker volume inspect notes-data
```

---

# 7. Run Container with Docker Volume

```bash
docker run -d \
--name notes-app \
-p 3000:3000 \
-v notes-data:/home/app/data \
notes-app
```

---

# 8. View Running Containers

```bash
docker ps
```

---

# 9. View All Containers

```bash
docker ps -a
```

---

# 10. View Container Logs

```bash
docker logs notes-app
```

---

# 11. Stop Container

```bash
docker stop notes-app
```

---

# 12. Start Existing Container

```bash
docker start notes-app
```

---

# 13. Restart Container

```bash
docker restart notes-app
```

---

# 14. Remove Container

```bash
docker rm notes-app
```

Force remove

```bash
docker rm -f notes-app
```

---

# 15. Remove Docker Image

```bash
docker rmi notes-app
```

---

# 16. Remove Docker Volume

```bash
docker volume rm notes-data
```

---

# 17. Remove Unused Volumes

```bash
docker volume prune
```

---

# 18. Execute Commands Inside Container

```bash
docker exec -it notes-app sh
```

---

# 19. Copy File from Container

```bash
docker cp notes-app:/home/app/file.txt .
```

---

# 20. View Docker Volume Location

```bash
docker volume inspect notes-data
```

---

# 21. Check Docker Version

```bash
docker --version
```

---

# 22. Check Docker Compose Version

```bash
docker compose version
```

---

# 23. Remove All Stopped Containers

```bash
docker container prune
```

---

# 24. Remove All Unused Images

```bash
docker image prune
```

---

# 25. Remove Everything (Use Carefully)

```bash
docker system prune -a
```

---

# 26. Verify Data Persistence

### Create Notes

↓

Stop Container

```bash
docker stop notes-app
```

↓

Remove Container

```bash
docker rm notes-app
```

↓

Run Again Using Same Volume

```bash
docker run -d \
--name notes-app \
-p 3000:3000 \
-v notes-data:/home/app/data \
notes-app
```

↓

Open

```
http://localhost:3000
```

Previously created notes should still exist.

---

# Command Summary

| Command | Purpose |
|----------|---------|
| `docker build -t notes-app .` | Build Docker image |
| `docker run` | Create and start container |
| `docker volume create` | Create Docker volume |
| `docker volume ls` | List volumes |
| `docker volume inspect` | Inspect volume details |
| `docker ps` | Running containers |
| `docker ps -a` | All containers |
| `docker logs` | View logs |
| `docker exec` | Open container shell |
| `docker stop` | Stop container |
| `docker start` | Start container |
| `docker restart` | Restart container |
| `docker rm` | Remove container |
| `docker rmi` | Remove image |
| `docker volume rm` | Delete volume |
| `docker volume prune` | Remove unused volumes |
| `docker image prune` | Remove unused images |
| `docker system prune -a` | Remove unused Docker resources |
