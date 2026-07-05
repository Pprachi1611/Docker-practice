# 📦 Docker Volumes - Persistent Notes Application

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Docker Volumes](https://img.shields.io/badge/Docker-Volumes-0db7ed?style=for-the-badge&logo=docker&logoColor=white)

A simple **Node.js Notes Application** demonstrating how **Docker Volumes** provide persistent storage for containerized applications.

Unlike storing data inside a container, Docker Volumes keep application data even if the container is stopped, removed, or recreated.

This project demonstrates one of the most important Docker concepts used in real-world deployments.

---

# 📌 Project Objective

The purpose of this project is to understand:

- Docker Volumes
- Persistent Data Storage
- Container Lifecycle
- Mounting Volumes
- Dockerized Node.js Applications
- Data Persistence after Container Recreation

---

# 🛠 Tech Stack

- Node.js
- Express.js
- HTML
- CSS
- Vanilla JavaScript
- Docker
- Docker Volumes

---

# 📂 Project Structure

```
04-Docker-Volumes/
│
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
├── server.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── README.md
├── COMMANDS.md
└── NOTES.md
```

---

# 🧱 Docker Architecture

```text
                 User
                   │
                   ▼
            Browser (Port 3000)
                   │
                   ▼
         Docker Container (Node.js)
                   │
         Reads / Writes Notes
                   │
                   ▼
         Docker Volume (Persistent)
                   │
                   ▼
           Host Machine Storage
```

---

# ⚙️ How It Works

1. User opens the Notes App.
2. A note is created from the browser.
3. Node.js receives the request.
4. The note is saved inside the mounted Docker Volume.
5. Even if the container is deleted and recreated, the notes remain available.

---

# 🚀 Build Docker Image

```bash
docker build -t notes-app .
```

---

# ▶️ Run Container

Without volume:

```bash
docker run -d \
--name notes-app \
-p 3000:3000 \
notes-app
```

With volume:

```bash
docker run -d \
--name notes-app \
-p 3000:3000 \
-v notes-data:/home/app/data \
notes-app
```

---

# 📦 Create Volume

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

Remove volume

```bash
docker volume rm notes-data
```

---

# 🔍 Verify Persistence

### Step 1

Create few notes.

↓

### Step 2

Delete container.

```bash
docker rm -f notes-app
```

↓

### Step 3

Run container again using same volume.

↓

### Step 4

Previously created notes are still available.

✅ Data Persistence Achieved.

---

# 💾 Why Docker Volumes?

Without Docker Volume

```
Container Deleted
      │
      ▼
Application Data Lost ❌
```

With Docker Volume

```
Container Deleted
      │
      ▼
Docker Volume
      │
      ▼
Data Preserved ✅
```

---

# 📊 Project Workflow

```text
Create Docker Image
          │
          ▼
Run Container
          │
          ▼
Mount Docker Volume
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

# 🧠 Docker Concepts Practiced

- Docker Images
- Docker Containers
- Docker Volumes
- Bind Mount vs Volume
- Volume Mounting
- Data Persistence
- Dockerfile
- Node.js Containerization

---

# 📸 Screenshots

Add screenshots here.

### Application

```
images/app-home.png
```

---

### Create Note

```
images/create-note.png
```

---

### Docker Volume

```
images/docker-volume.png
```

---

### Docker Containers

```
images/docker-ps.png
```

---

### Data Persistence

```
images/persistent-data.png
```

---

# 📚 Learning Outcomes

After completing this project, I learned:

- Difference between Containers and Volumes
- Why container storage is ephemeral
- How Docker Volumes persist application data
- Creating and managing Docker Volumes
- Mounting volumes inside containers
- Running Node.js applications inside Docker
- Verifying persistent storage after container recreation

---

# 👩‍💻 Author

**Prachi Patil**

Learning Docker by building hands-on projects covering containerization, networking, volumes, Docker Compose, AWS ECR, and deployment on AWS EC2.

---
