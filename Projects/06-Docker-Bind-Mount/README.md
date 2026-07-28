# 🚀 Project 06 - Docker Bind Mounts (To-Do List)

## 📌 Project Overview

This project demonstrates how Docker Bind Mounts work using a simple To-Do List application built with HTML, CSS, and JavaScript.

Normally, after building a Docker image, any changes made to the source code require rebuilding the image. Bind Mounts solve this problem by allowing the Docker container to directly access files from the host machine.

This enables real-time code updates without rebuilding the Docker image.

---

## 🎯 Objectives

- Understand Docker Bind Mounts
- Learn why Docker images don't reflect source code changes
- Run an Nginx container
- Serve static HTML, CSS, and JavaScript files
- Mount local source code inside the container

---

## 🛠️ Technologies Used

- Docker
- Nginx (Alpine)
- HTML
- CSS
- JavaScript

---

## 📂 Project Structure

```
06-Docker-Bind-Mounts/

│── Dockerfile
│── .dockerignore
│── index.html
│── style.css
│── script.js
│── README.md
│── NOTES.md
└── COMMANDS.md
```

---

## 🐳 Dockerfile

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
```

---

## 🚀 Build Docker Image

```bash
docker build -t todo .
```

---

## ▶️ Run Without Bind Mount

```bash
docker run -d --name todo-app -p 8080:80 todo
```

Open

```
http://localhost:8080
```

---

## ❌ Problem

If you modify

- index.html
- style.css
- script.js

nothing changes because Docker copied the files while building the image.

You must rebuild the image.

---

## ✅ Run Using Bind Mount

Windows CMD

```bash
docker run -d --name todo-app -p 8080:80 -v "%cd%":/usr/share/nginx/html nginx:alpine
```

PowerShell

```powershell
docker run -d --name todo-app -p 8080:80 -v "${PWD}:/usr/share/nginx/html" nginx:alpine
```

Now every change appears instantly after refreshing the browser.

---

## 📚 Key Learning

- Docker Images are immutable.
- COPY copies files only while building the image.
- Bind Mount shares the host directory with the container.
- Bind Mounts are mainly used during development.

---

## 👩‍💻 Author

Prachi Patil