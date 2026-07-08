# Project 05 - Multi-Stage Docker Build (React + Vite)

## Objective

Learn how to containerize a React application using Docker and understand the benefits of a multi-stage build.

---

# Technologies Used

- React
- Vite
- Docker
- Nginx
- Node.js

---

# Why Vite?

Vite is a modern frontend build tool that provides:

- Fast development server
- Instant Hot Module Replacement (HMR)
- Optimized production builds
- Simpler project setup compared to Create React App

---

# Why Docker?

Docker packages an application along with its dependencies into a container.

Benefits:

- Runs the same on every machine
- Easy deployment
- No dependency conflicts
- Isolated environment
- Portable

---

# What is a Multi-Stage Build?

A multi-stage build uses multiple `FROM` statements in a single Dockerfile.

Each stage has its own purpose.

Example:

Stage 1 → Build the application

Stage 2 → Run the application

---

# Why Use a Multi-Stage Build?

Without multi-stage:

- Source code remains in the final image
- Node modules remain
- Image becomes very large

With multi-stage:

- Only production files are copied
- Smaller image
- Faster deployment
- Better security

---

# Project Workflow

React Source Code
        │
        ▼
npm install
        │
        ▼
npm run build
        │
        ▼
dist/
        │
        ▼
Copied into Nginx
        │
        ▼
Browser

---

# Dockerfile

```dockerfile
# Stage 1: Build React Application

FROM node:24-alpine AS build

WORKDIR /home/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# Stage 2: Serve React App using Nginx

FROM nginx:alpine

COPY --from=build /home/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

# Dockerfile Explanation

## Stage 1

### FROM node:24-alpine AS build

- Uses Node.js Alpine image.
- Alpine is lightweight.
- `AS build` names this stage.

---

### WORKDIR /home/app

Creates the working directory inside the container.

Equivalent to:

```
cd /home/app
```

---

### COPY package*.json ./

Copies:

- package.json
- package-lock.json

Only these files are copied first to improve Docker layer caching.

---

### RUN npm install

Installs all project dependencies.

---

### COPY . .

Copies the remaining project files into the container.

---

### RUN npm run build

Creates an optimized production build.

Output folder:

```
dist/
```

---

# Stage 2

### FROM nginx:alpine

Starts with a lightweight Nginx image.

Node.js is no longer required because React is now static files.

---

### COPY --from=build

Copies the build output from Stage 1.

```
/home/app/dist
```

to

```
/usr/share/nginx/html
```

This is Nginx's default web root.

---

### EXPOSE 80

Documents that the container listens on port 80.

---

### CMD

Starts the Nginx server.

```
nginx -g "daemon off;"
```

`daemon off;`

Keeps Nginx running in the foreground so the container doesn't stop.

---

# Why Nginx?

React production builds are just:

- HTML
- CSS
- JavaScript

These are static files.

Nginx is designed specifically to serve static websites.

Advantages:

- Very fast
- Lightweight
- Secure
- Industry standard
- Low memory usage

---

# Can We Run React Without Nginx?

Yes.

Possible methods:

## 1. npm run dev

Uses Vite Development Server.

Suitable only for development.

---

## 2. npm run preview

Uses Vite Preview Server.

Good for testing production builds.

Not recommended for production deployment.

---

## 3. Express Server

Serve the `dist` folder using Express.

Requires Node.js.

---

## 4. Nginx (Recommended)

Most common production solution.

---

# Development vs Production

Development

```
npm run dev
```

- Fast refresh
- Source code available
- Debugging enabled

Production

```
npm run build
```

Creates:

```
dist/
```

Optimized for deployment.

---

# Build Docker Image

```bash
docker build -t react-calculator .
```

Explanation:

- docker build → Build image
- -t → Tag image
- react-calculator → Image name
- . → Current directory

---

# Run Container

```bash
docker run -d -p 8080:80 --name calculator react-calculator
```

Explanation:

- -d → Detached mode
- -p 8080:80 → Host port : Container port
- --name → Container name

Open:

```
http://localhost:8080
```

---

# Useful Docker Commands

Build image

```bash
docker build -t react-calculator .
```

List images

```bash
docker images
```

Run container

```bash
docker run -d -p 8080:80 react-calculator
```

List containers

```bash
docker ps
```

Stop container

```bash
docker stop <container-id>
```

Remove container

```bash
docker rm <container-id>
```

Remove image

```bash
docker rmi react-calculator
```

View logs

```bash
docker logs <container-id>
```

Open shell inside container

```bash
docker exec -it <container-id> sh
```

---

# Advantages of Multi-Stage Builds

- Smaller Docker image
- Faster downloads
- Better security
- Cleaner Dockerfile
- No development dependencies in production
- Faster deployment

---

# Folder Structure

```
05-Multi-Stage-Build/

│── public/
│── src/
│── Dockerfile
│── .dockerignore
│── package.json
│── vite.config.js
│── README.md
│── notes.md
```

---

# Key Concepts Learned

- React application structure
- Vite project setup
- Docker basics
- Dockerfile instructions
- Multi-stage builds
- Production build (`npm run build`)
- Static file serving
- Nginx
- Docker image creation
- Docker container execution

---

# Interview Questions

### Why use a multi-stage build?

To reduce the final image size by copying only the production build into the runtime image.

---

### Why use Nginx?

Because React production builds are static files, and Nginx is optimized for serving static content efficiently.

---

### Why copy `package*.json` before the source code?

To leverage Docker layer caching. If only source code changes and dependencies remain the same, Docker reuses the cached `npm install` layer, making builds faster.

---

### What is the purpose of `npm run build`?

It generates an optimized production-ready version of the React application inside the `dist` folder.

---

### What is the purpose of `.dockerignore`?

It prevents unnecessary files (like `node_modules`, `.git`, logs, etc.) from being sent to the Docker build context, reducing build time and image size.

---

# Conclusion

In this project, we built a React application using Vite, created an optimized production build, and containerized it using Docker with a multi-stage build. We used Node.js only for building the application and Nginx to serve the final static files, resulting in a smaller, faster, and production-ready Docker image.
