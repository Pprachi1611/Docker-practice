# 🐳 Project 06 - Docker Bind Mounts
## Commands Reference

This document contains only the Docker commands used in this project.

---

# 1. Build Docker Image

```bash
docker build -t todo .
```

Builds a Docker image named **todo** using the Dockerfile in the current directory.

---

# 2. Verify Docker Image

```bash
docker images
```

Lists all Docker images available on the local machine.

Verify that the **todo** image was successfully created.

---

# 3. Run Container (Without Bind Mount)

```bash
docker run -d --name todo-app -p 8080:80 todo
```

Runs the Docker image as a container.

Explanation:

- `-d` → Run in detached (background) mode.
- `--name todo-app` → Assign a custom container name.
- `-p 8080:80` → Maps host port **8080** to container port **80**.
- `todo` → Docker image name.

Open:

```
http://localhost:8080
```

---

# 4. View Running Containers

```bash
docker ps
```

Displays all currently running containers.

---

# 5. Stop the Container

```bash
docker stop todo-app
```

Stops the running container.

---

# 6. Remove the Container

```bash
docker rm todo-app
```

Deletes the stopped container.

---

# 7. Run Using a Bind Mount (Windows CMD)

```bash
docker run -d --name todo-app -p 8080:80 -v "%cd%":/usr/share/nginx/html nginx:alpine
```

Runs an Nginx container and mounts the current project folder inside the container.

Explanation:

- `-v` → Creates a bind mount.
- `%cd%` → Current project directory (Windows CMD).
- `:` → Separates the host path and container path.
- `/usr/share/nginx/html` → Nginx's default web root directory.

Now any changes made to the project files are reflected immediately after refreshing the browser.

---

# 8. Verify Running Container

```bash
docker ps
```

Ensure the new container is running with the bind mount.

---

# Command Flow

```
docker build
      │
      ▼
docker images
      │
      ▼
docker run
      │
      ▼
docker ps
      │
      ▼
docker stop
      │
      ▼
docker rm
      │
      ▼
docker run (Bind Mount)
      │
      ▼
docker ps
```
