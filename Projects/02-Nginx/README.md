# 🚀 Project 02 - Nginx Web Server using Docker

## 📌 Overview

This project demonstrates how to run an Nginx web server inside a Docker container. It also covers port mapping and serving a custom static HTML page using a bind mount.

This project builds on the concepts learned in Project 01 by introducing a long-running container and browser accessibility.

---

## 🎯 Objectives

- Pull the Nginx image from Docker Hub
- Run an Nginx container
- Map container ports to the host machine
- Access the web server through a browser
- Serve a custom HTML page using a bind mount
- Manage the Nginx container

---

## 📂 Project Structure

```
02-Nginx
│
├── README.md
├── commands.md
├── notes.md
├── website
│   └── index.html
└── screenshots
```

---

## 🚀 How to Run

### Pull the Nginx image

```bash
docker pull nginx
```

### Run the container

```bash
docker run -d --name my-nginx -p 8080:80 nginx
```

### Open in browser

```
http://localhost:8080
```

### Run with custom website

```bash
docker run -d --name my-nginx -p 8080:80 -v <path-to-website>:/usr/share/nginx/html nginx
```

---

## 📸 Expected Output

- Nginx Welcome Page
- Custom HTML Page
- Running container in Docker Desktop
- Running container shown in `docker ps`

---

## 🛠️ Skills Practiced

- Docker Images
- Docker Containers
- Port Mapping
- Bind Mounts
- Nginx Web Server
- Docker CLI

---

## 📚 Technologies Used

- Docker Desktop
- Docker CLI
- Nginx
- HTML

---

## ✅ Project Status

Completed
