# 📘 Docker Bind Mounts - Revision Notes

---

# 📌 Project Goal

```
          Local Project
                │
                ▼
      Docker Container
                │
                ▼
      See changes instantly
      (No docker build)
```

✅ Learn how Docker shares files between the host machine and the container.

---

# 🚀 Complete Workflow

```
Create Project
      │
      ▼
Write Dockerfile
      │
      ▼
docker build
      │
      ▼
Docker Image
      │
      ▼
docker run
      │
      ▼
Running Container
      │
      ▼
Edit HTML
      │
      ▼
❌ Changes NOT Visible

-------------------------------

Run with Bind Mount

      │
      ▼

Edit HTML
      │
      ▼
Save
      │
      ▼
Refresh Browser
      │
      ▼
✅ Changes Visible
```

---

# 🐳 Dockerfile Explained

```
FROM nginx:alpine
        │
        ▼
Base Image
(Lightweight Nginx)

-------------------------

COPY . /usr/share/nginx/html
        │
        ▼
Copies project files
into Nginx Web Root

-------------------------

EXPOSE 80
        │
        ▼
Application listens
on Port 80
```

---

# 📦 Docker Build Process

```
Current Folder

│
├── Dockerfile
├── index.html
├── style.css
└── script.js

        │
        ▼

docker build

        │
        ▼

Docker reads Dockerfile

        │
        ▼

Downloads nginx

        │
        ▼

Copies Files

        │
        ▼

Creates Docker Image
```

---

# 🖥️ Image vs Container

```
Dockerfile
      │
      ▼
 Docker Image
(Blueprint)

      │ docker run
      ▼

Container
(Running Application)
```

💡 Remember

Image = Class

Container = Object

OR

Blueprint = House Design

Container = Actual House

---

# 📂 COPY vs Bind Mount

```
COPY

Host Folder
      │
      ▼
Docker Image

Creates a COPY
```

```
Bind Mount

Host Folder
      │
      ▼
Docker Container

Shares SAME files
```

| COPY | Bind Mount |
|------|------------|
| Copies files | Shares files |
| Requires rebuild | No rebuild |
| Production | Development |

---

# 🔄 Why Doesn't My Website Update?

```
Host Folder

index.html

      │

      │ COPY

      ▼

Docker Image

index.html

(Independent Copy)
```

Changing Host File

❌ Does NOT update Image

---

# 🔗 Bind Mount

```
Host Folder

index.html
style.css
script.js

        ▲
        │
        │ SAME FILES
        ▼

Docker Container

/usr/share/nginx/html
```

Changes are reflected immediately.

---

# 📌 Understanding the Command

docker run -d --name todo-app -p 8080:80 -v "%cd%":/usr/share/nginx/html nginx:alpine

```
docker run
      │
      ▼
Create Container

-d
      │
      ▼
Background

--name
      │
      ▼
Container Name

-p 8080:80
      │
      ▼
Host Port → Container Port

-v
      │
      ▼
Bind Mount

%cd%
      │
      ▼
Current Folder

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

---

# 💡 Development Workflow

WITHOUT Bind Mount

```
Edit Code

↓

docker build

↓

docker run

↓

Refresh
```

WITH Bind Mount

```
Edit Code

↓

Save

↓

Refresh

✅ Done
```

---

# 🎯 Interview One-Liners

✔ COPY creates a copy.

✔ Bind Mount shares files.

✔ Images are immutable.

✔ Containers are running instances of images.

✔ Bind Mounts are mainly used during development.

✔ Volumes are mainly used for persistent application data.

---

# 🧠 Memory Trick

```
COPY

Copy Once
↓

Build Time

--------------------

Bind Mount

Share Always
↓

Run Time
```