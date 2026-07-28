# 📘 Docker Bind Mounts - Revision Notes

# What is a Bind Mount?

A Bind Mount allows a Docker container to directly access a folder from the host machine.

Instead of creating a copy of the files, Docker uses the original files.

Host Folder
        │
        ▼
Docker Container

Whenever a file changes on the host machine, the container immediately sees the change.

---

# Why Bind Mounts?

Without Bind Mount

Edit Code

↓

docker build

↓

docker run

↓

Refresh Browser

With Bind Mount

Edit Code

↓

Save

↓

Refresh Browser

No rebuild required.

---

# Dockerfile Explanation

## FROM nginx:alpine

Uses the lightweight Nginx image as the base image.

Nginx is used to serve static files.

---

## COPY . /usr/share/nginx/html

Copies all project files from the current directory into Nginx's default web root.

'.' means current folder.

'/usr/share/nginx/html' is the directory where Nginx looks for website files.

---

## EXPOSE 80

Documents that the application listens on port 80.

It does NOT publish the port.

Publishing is done using:

docker run -p

---

# Build Context

Command

docker build -t todo .

The '.' represents the build context.

Docker sends the current folder to the Docker daemon.

---

# Image vs Container

Dockerfile

↓

Image

↓

Container

Image = Blueprint

Container = Running application

One image can create multiple containers.

---

# Why Doesn't My Website Update?

Because COPY creates a copy inside the Docker image.

Changing local files does not modify the image.

---

# Bind Mount Command

-v "%cd%":/usr/share/nginx/html

Breakdown

-v

Creates a mount.

%cd%

Current directory (Windows CMD).

:

Separates host path and container path.

/usr/share/nginx/html

Directory inside the container.

---

# COPY vs Bind Mount

COPY

Copies files while building.

Requires rebuilding the image after every change.

Bind Mount

Shares files.

No rebuild required.

Perfect for development.

---

# Interview Questions

Q. What is a Bind Mount?

A.

A Bind Mount maps a folder from the host machine into a Docker container so both use the same files.

---

Q. Why use Bind Mounts?

A.

To see source code changes instantly without rebuilding Docker images.

---

Q. Difference between COPY and Bind Mount?

COPY creates a copy.

Bind Mount shares files.

---

Q. Why nginx:alpine?

Small image.

Fast download.

Perfect for static websites.

---

Q. Does Bind Mount create a copy?

No.

It shares the original folder.

---

Q. What happens if the container is deleted?

Nothing happens to the host files because they remain on the local machine.

---

# Real World Use

React

Angular

Vue

Node.js

Python

Java

Developers use Bind Mounts during development to avoid rebuilding images after every code change.