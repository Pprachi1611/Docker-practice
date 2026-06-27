# 🚀 Docker Hello World

> My first Docker project demonstrating the Docker container lifecycle using the official `hello-world` image.

---

## 📌 Project Summary

This project is the starting point of my Docker learning journey. It focuses on understanding how Docker downloads an image, creates a container, executes it, and manages its lifecycle.

---

## 🎯 Learning Goals

- Understand the Docker workflow
- Run the first Docker container
- Explore Docker images and containers
- Learn basic Docker CLI commands

---

## 📂 Project Structure

```
01-Hello-World
│
├── README.md
├── commands.md
├── notes.md
└── screenshots
```

---

## 🚀 Execution

Run the following command:

```bash
docker run hello-world
```

Docker will:

- Pull the image (if it doesn't exist locally)
- Create a container
- Start the container
- Execute the application
- Stop the container automatically

---

## 📊 Output Verification

Verify the execution using:

```bash
docker images
docker ps
docker ps -a
```

---

## 📸 Project Output

| Screenshot | Description |
|------------|-------------|
| hello-world.png | Hello World execution |
| docker-images.png | Local Docker images |
| docker-ps.png | Running containers |
| docker-ps-a.png | All containers |

---

## 📖 Key Learnings

- Pulled an image from Docker Hub
- Created and executed a Docker container
- Explored Docker CLI
- Verified image download
- Verified container lifecycle

---

## 📁 Repository

```
Projects/
└── 01-Hello-World/
```

---

## ✅ Status

Completed
