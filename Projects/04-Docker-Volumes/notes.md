# 📘 Project 04 – Docker Volumes (Notes)

## 🎯 Objective

The objective of this project is to understand how **Docker Volumes** provide persistent storage for containers. By default, data stored inside a container is lost when the container is removed. Docker Volumes solve this problem by storing data outside the container.

---

# What is a Docker Volume?

A **Docker Volume** is a persistent storage mechanism managed by Docker.

It allows data to remain available even after a container is stopped, removed, or recreated.

Docker stores volumes separately from containers, making them ideal for databases, user uploads, logs, configuration files, and application data.

---

# Why Do We Need Docker Volumes?

Without Docker Volumes:

- Data is stored inside the container.
- Removing the container deletes all application data.
- New containers start with empty storage.

With Docker Volumes:

- Data is stored outside the container.
- Containers can be recreated without losing data.
- Multiple containers can share the same data if required.

---

# Container Storage vs Docker Volume

## Container Storage

```
Container
│
├── Application
├── Node Modules
└── Notes Data

Container Removed
        ↓
Everything is Deleted ❌
```

---

## Docker Volume

```
Container
│
├── Application
└── Docker Volume
       │
       ▼
Persistent Storage

Container Removed
        ↓
Data Still Exists ✅
```

---

# How Docker Volumes Work

```
User
   │
   ▼
Browser
   │
   ▼
Node.js Application
   │
Writes Notes
   │
   ▼
Docker Volume
   │
   ▼
Host Machine Storage
```

---

# Project Workflow

```
Create Docker Image
        │
        ▼
Run Container
        │
        ▼
Create Docker Volume
        │
        ▼
Mount Volume
        │
        ▼
Create Notes
        │
        ▼
Stop Container
        │
        ▼
Delete Container
        │
        ▼
Run New Container
        │
        ▼
Notes Still Available
```

---

# Docker Volume Syntax

```
-v <volume-name>:<container-path>
```

Example

```bash
-v notes-data:/home/app/data
```

Where:

- **notes-data** → Docker Volume
- **/home/app/data** → Directory inside the container

---

# What Happens Internally?

```
Docker Volume
notes-data
        │
        ▼
Host Machine Storage
        │
        ▼
Mounted Inside Container
/home/app/data
```

Whenever the application saves a note inside `/home/app/data`, Docker automatically stores it inside the volume.

---

# Docker Volume Lifecycle

```
Create Volume
      │
      ▼
Attach to Container
      │
      ▼
Application Writes Data
      │
      ▼
Container Removed
      │
      ▼
Volume Still Exists
      │
      ▼
New Container Uses Same Volume
```

---

# Docker Volume Commands

Create volume

```bash
docker volume create notes-data
```

List volumes

```bash
docker volume ls
```

Inspect volume

```bash
docker volume inspect notes-data
```

Delete volume

```bash
docker volume rm notes-data
```

---

# Mounting a Volume

Example

```bash
docker run -d \
--name notes-app \
-p 3000:3000 \
-v notes-data:/home/app/data \
notes-app
```

This command:

- Starts the container.
- Mounts the Docker Volume.
- Saves application data inside the volume.
- Ensures data survives container recreation.

---

# Data Persistence Demo

### Step 1

Run the application using Docker Volume.

↓

### Step 2

Create multiple notes.

↓

### Step 3

Stop the container.

↓

### Step 4

Delete the container.

↓

### Step 5

Run a new container using the same Docker Volume.

↓

### Step 6

Previously created notes are still available.

---

# Advantages of Docker Volumes

- Persistent data storage
- Easy backup and restore
- Independent of container lifecycle
- Faster than bind mounts in many cases
- Can be shared between multiple containers
- Managed directly by Docker

---

# Volumes vs Bind Mounts

| Docker Volume | Bind Mount |
|---------------|------------|
| Managed by Docker | Managed by Host OS |
| Portable | Host-dependent |
| Recommended for production | Mostly used during development |
| Stored in Docker's storage | Stored in any host directory |
| Easier to manage | Requires manual directory management |

---

# Real-World Use Cases

Docker Volumes are commonly used for:

- MongoDB databases
- MySQL databases
- PostgreSQL databases
- User-uploaded files
- Application logs
- Configuration files
- Backup storage
- WordPress content
- Redis persistence

---

# Key Learnings

After completing this project, I learned:

- What Docker Volumes are
- Why containers lose data
- How persistent storage works
- Creating and managing Docker Volumes
- Mounting volumes inside containers
- Difference between Volumes and Bind Mounts
- Verifying persistent storage after container recreation
- Basic Docker Compose volume configuration

---

# Interview Questions

### What is a Docker Volume?

A Docker Volume is a persistent storage mechanism managed by Docker that allows data to survive container deletion.

---

### Why are Docker Volumes used?

They provide persistent storage independent of the container lifecycle.

---

### Does deleting a container delete the volume?

No.

Volumes remain until they are explicitly removed.

---

### Can multiple containers use the same volume?

Yes.

Multiple containers can mount and share the same Docker Volume.

---

### Where are Docker Volumes stored?

Docker stores volumes in its managed storage area on the host machine.

---

# Summary

This project demonstrates one of Docker's most important features—**persistent storage**. By using Docker Volumes, application data remains safe even when containers are recreated, making them essential for stateful applications such as databases, file storage systems, and production deployments.
