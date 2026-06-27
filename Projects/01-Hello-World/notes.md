# 🚀 Docker Project 01 - Hello World

## 📌 Project Overview

This is my first Docker project as part of my DevOps learning journey.

The goal of this project is to understand how Docker works by running the official **hello-world** container and exploring the basic Docker commands used to manage images and containers.

---

# 🎯 Objectives

- Install and verify Docker
- Run the first Docker container
- Understand Docker Images
- Understand Docker Containers
- Learn the Docker workflow
- Learn basic Docker commands

---

# 🛠️ Prerequisites

- Docker Desktop Installed
- Docker Engine Running
- Internet Connection (to pull images from Docker Hub)

---

# 📂 Project Structure

```
01-Hello-World
│
├── README.md
├── commands.md
├── notes.md
└── screenshots
```

---

# ▶️ Commands Used

### Check Docker Version

```bash
docker --version
```

### Check Docker Information

```bash
docker info
```

### Run Hello World Container

```bash
docker run hello-world
```

### View Downloaded Images

```bash
docker images
```

### View Running Containers

```bash
docker ps
```

### View All Containers

```bash
docker ps -a
```

---

# ⚙️ How Docker Works

```
Docker Run Command
        │
        ▼
Checks Local Images
        │
        ▼
Downloads Image (if not found)
        │
        ▼
Creates Container
        │
        ▼
Starts Container
        │
        ▼
Executes Application
        │
        ▼
Stops Container
```

---

# 📸 Screenshots

Place the screenshots inside the **screenshots** folder.

Example:

- hello-world.png
- docker-images.png
- docker-ps-a.png

---

# 📖 Learning Outcomes

After completing this project, I learned:

- What Docker is
- What Docker Hub is
- Difference between an Image and a Container
- How Docker downloads images
- How to run containers
- How to view images
- How to list containers
- Difference between `docker ps` and `docker ps -a`

---

# 📚 Technologies Used

- Docker Desktop
- Docker CLI

---

# ✅ Project Status

Completed ✔️
