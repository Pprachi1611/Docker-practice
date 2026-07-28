# 📘 Project 06 - Docker Bind Mounts (Revision Notes)

> **Project Goal**
>
> Learn how Docker Bind Mounts allow a container to directly access files from the host machine so code changes are reflected instantly without rebuilding the Docker image.

---

# 📌 What Problem Are We Solving?

Suppose we have a simple website.

```
Project

├── index.html
├── style.css
└── script.js
```

We build the Docker image.

```bash
docker build -t todo .
```

and run it.

```bash
docker run -d --name todo-app -p 8080:80 todo
```

Now we edit **index.html**.

Will the browser update?

**No.**

Why?

Because Docker copied the files into the image while building it.

Every code change requires:

```
Edit Code
     │
     ▼
docker build
     │
     ▼
docker run
     │
     ▼
Refresh Browser
```

This is slow during development.

---

# ✅ Solution : Bind Mount

Instead of copying files inside the image, Docker can directly use files from our local machine.

```
                 Bind Mount

┌─────────────────────┐
│   Host Machine      │
│                     │
│ index.html          │
│ style.css           │
│ script.js           │
└─────────┬───────────┘
          │
          │ Shared
          │
┌─────────▼───────────┐
│ Docker Container    │
│                     │
│ /usr/share/nginx/   │
│        html         │
└─────────────────────┘
```

Now both the host and container use the **same files**.

So whenever you save a file locally,

```
Edit

↓

Save

↓

Refresh Browser

↓

Updated Website ✅
```

No rebuild required.

---

# 📦 Dockerfile Used

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80
```

Although this project demonstrates Bind Mounts, we still create a Docker image first to understand why the problem exists.

---

# 🔍 Understanding Each Instruction

## 1. FROM nginx:alpine

```
Dockerfile
      │
      ▼
Uses nginx:alpine
      │
      ▼
Creates Base Image
```

This downloads the lightweight Nginx image which will serve our static website.

### Why Alpine?

- Small image size
- Faster download
- Less storage
- Faster container startup

---

## 2. COPY . /usr/share/nginx/html

```
Current Folder

├── index.html
├── style.css
└── script.js

        │
        │ COPY
        ▼

Docker Image

/usr/share/nginx/html
```

This instruction copies every file from the current directory into Nginx's default web root.

### Important

This happens **only once** during image build.

After that,

```
Host Files

≠

Image Files
```

They become separate copies.

---

## 3. EXPOSE 80

```
Container

Nginx

↓

Listening on

Port 80
```

This tells Docker that the application inside the container uses port 80.

> **Remember**
>
> EXPOSE does **NOT** publish the port.
>
> Port publishing is done using `-p`.

---

# 🏗 Docker Build Process

When we execute

```bash
docker build -t todo .
```

Docker performs the following steps.

```
Current Folder
      │
      ▼
Locate Dockerfile
      │
      ▼
Read FROM
      │
      ▼
Download nginx:alpine
      │
      ▼
Execute COPY
      │
      ▼
Store Files Inside Image
      │
      ▼
Execute EXPOSE
      │
      ▼
Create Docker Image
```

Final Result

```
Image

todo:latest
```

---

# 📦 Image vs Container

Many beginners confuse these.

```
Dockerfile
      │
      ▼
Docker Image
(Blueprint)
      │
docker run
      ▼
Container
(Running Instance)
```

Think of it like this.

| Image | Container |
|--------|-----------|
| Blueprint | Building |
| Class | Object |
| Template | Running Application |

One image can create multiple containers.

```
todo Image

      │

 ┌────┼────┐

 ▼    ▼    ▼

C1   C2   C3
```

---

# ❓ Why Doesn't My Website Update?

Suppose you change

```html
<h1>Todo App</h1>
```

to

```html
<h1>Docker Rocks</h1>
```

Browser still shows

```
Todo App
```

Reason

```
Host Folder

index.html

      │

      │ COPY

      ▼

Docker Image

index.html
```

Docker copied the file while building.

Your local project and Docker image are now independent.

---

# 🚀 How Bind Mount Solves This

Command

```bash
docker run -d --name todo-app -p 8080:80 -v "%cd%":/usr/share/nginx/html nginx:alpine
```

Behind the scenes

```
Host Machine

C:\Todo

        │

        │ Bind Mount

        ▼

Container

/usr/share/nginx/html
```

Now

```
Host File

index.html

        ▲

        │ Same File

        ▼

Container

index.html
```

The container is no longer using a copied version.

It directly reads your local files.

---

# 🔍 Understanding the Bind Mount Command

```bash
docker run -d --name todo-app -p 8080:80 -v "%cd%":/usr/share/nginx/html nginx:alpine
```

Breakdown

```
docker run
      │
      ▼
Create Container

-d
      │
      ▼
Detached Mode

--name
      │
      ▼
Container Name

-p
      │
      ▼
Host Port → Container Port

-v
      │
      ▼
Create Bind Mount

%cd%
      │
      ▼
Current Project Folder

/usr/share/nginx/html
      │
      ▼
Nginx Default Website Folder
```

---

# 🌐 Port Mapping

```
Browser

localhost:8080

      │

      ▼

Docker

      │

      ▼

Container

Port 80

      │

      ▼

Nginx
```

This means

```
Host

8080

↓

Container

80
```

---

# ⚖ COPY vs Bind Mount

| COPY | Bind Mount |
|------|------------|
| Copies files | Shares files |
| Happens during image build | Happens while running container |
| Two separate copies | Same files |
| Needs rebuild after changes | No rebuild required |
| Mostly Production | Mostly Development |

---

# 🧠 Build Time vs Run Time

One of the most important interview concepts.

```
Docker Build

↓

FROM

↓

COPY

↓

EXPOSE

↓

Image Created
```

Everything above happens during **Build Time**.

--------------------------------------------

```
docker run

↓

Container Starts

↓

Bind Mount Created

↓

Application Runs
```

Everything above happens during **Run Time**.

---

# 💡 Why Use Bind Mounts?

Imagine you're developing a React application.

Without Bind Mount

```
Change CSS

↓

docker build

↓

docker run

↓

Check Browser
```

Repeat this hundreds of times.

With Bind Mount

```
Change CSS

↓

Save

↓

Refresh

↓

Done ✅
```

This is why almost every developer uses Bind Mounts during development.

---

# ⚠ Common Mistakes

## Mistake 1

Thinking COPY keeps files synchronized.

❌ Wrong

COPY creates a copy only once.

---

## Mistake 2

Thinking EXPOSE publishes ports.

❌ Wrong

Publishing is done using

```bash
-p
```

---

## Mistake 3

Confusing Bind Mount with Docker Volume.

Remember

```
Bind Mount

↓

Source Code

↓

Development
```

```
Docker Volume

↓

Application Data

↓

Persistence
```

---

## Mistake 4

Running another container with the same name.

Example

```bash
docker run --name todo-app ...
```

while another container named `todo-app` already exists.

Result

```
Conflict

Container name already exists.
```

---

# 💼 Real-World Use Cases

Bind Mounts are commonly used for

- React Development
- Angular Development
- Vue Development
- Node.js Development
- Python Flask
- Django
- Spring Boot
- ASP.NET

During development only.

For production deployments, applications are generally packaged into images instead of using bind mounts.

---

# 🎤 Interview Questions

### What is a Docker Bind Mount?

A Bind Mount maps a directory from the host machine into a Docker container, allowing both to use the same files.

---

### Why are Bind Mounts mainly used during development?

Because developers frequently modify source code. Bind Mounts eliminate the need to rebuild Docker images after every change.

---

### What is the difference between COPY and Bind Mount?

COPY creates a separate copy of files inside the Docker image during build time.

Bind Mount shares the original host files with the container during runtime.

---

### Does deleting the container delete my project files?

No.

The files remain on the host machine because the container only references them through the Bind Mount.

---

### Can I use Bind Mounts in Production?

Generally, no.

Bind Mounts are mainly intended for development. Production deployments typically use immutable Docker images.

---

# 📝 Key Takeaways

✅ COPY executes only during image build.

✅ Bind Mount is created when the container starts.

✅ COPY creates a new copy of files.

✅ Bind Mount shares the same files.

✅ Images are immutable.

✅ Containers are running instances of images.

✅ Nginx serves files from `/usr/share/nginx/html`.

✅ `EXPOSE` documents the container port.

✅ `-p` publishes the port.

✅ Bind Mounts significantly improve the development workflow by removing the need to rebuild images after every code change.
