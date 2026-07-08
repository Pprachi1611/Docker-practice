# 🧮 React Calculator - Multi-Stage Docker Build

A modern and responsive calculator application built using **React** and **Vite**, containerized with **Docker** using a **Multi-Stage Build** and served using **Nginx**.

---

## 📌 Project Overview

This project demonstrates how to:

- Build a React application using Vite.
- Create reusable React components.
- Implement calculator functionality using React Hooks.
- Containerize the application using Docker.
- Optimize the Docker image using a Multi-Stage Build.
- Serve the production build using Nginx.

---

## 📸 Project Preview



```
📷 Screenshot:
images/calculator.png
```

---

## 🚀 Features

### Calculator Features

- ✅ Addition
- ✅ Subtraction
- ✅ Multiplication
- ✅ Division
- ✅ Decimal Numbers
- ✅ Percentage (%)
- ✅ Positive / Negative (±)
- ✅ Delete Last Digit (⌫)
- ✅ All Clear (AC)
- ✅ Keyboard Support
- ✅ Calculation History
- ✅ Clear History
- ✅ Responsive UI
- ✅ Glassmorphism Design

---

## 🛠️ Technologies Used

### Frontend

- React
- Vite
- JavaScript
- CSS3

### Containerization

- Docker
- Nginx

---

# 📂 Project Structure

```text
05-Multi-Stage-Build/

│── public/
│
│── src/
│   │
│   ├── components/
│   │      Button.jsx
│   │      Button.css
│   │      ButtonGrid.jsx
│   │      ButtonGrid.css
│   │      Calculator.jsx
│   │      Calculator.css
│   │      Display.jsx
│   │      Display.css
│   │      History.jsx
│   │      History.css
│   │
│   ├── utils/
│   │      calculator.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── Dockerfile
├── .dockerignore
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
├── notes.md
└── commands.md
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone <repository-url>
```

Go to the project folder

```bash
cd 05-Multi-Stage-Build
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

# 🏗️ Build for Production

Create the production build

```bash
npm run build
```

The optimized files will be generated inside:

```
dist/
```

---

# 🐳 Docker

## Build Docker Image

```bash
docker build -t react-calculator .
```

---

## Run Docker Container

```bash
docker run -d -p 8080:80 --name react-calculator-container react-calculator
```

Open

```
http://localhost:8080
```

---

# 📄 Dockerfile Overview

The project uses a **Multi-Stage Docker Build**.

### Stage 1

- Uses Node.js
- Installs dependencies
- Builds the React application

### Stage 2

- Uses Nginx
- Copies only the production build (`dist`)
- Serves the application

Benefits:

- Smaller Docker Image
- Better Performance
- Faster Deployment
- Improved Security

---

# 🧠 React Concepts Practiced

- Functional Components
- Component-Based Architecture
- Props
- useState
- useEffect
- Event Handling
- Conditional Rendering
- Array Mapping
- CSS Grid Layout
- Responsive Design

---

# 🐳 Docker Concepts Learned

- Docker Images
- Docker Containers
- Dockerfile
- Multi-Stage Build
- Build Context
- Docker Layer Caching
- Nginx
- Production Deployment

---

# 📖 Learning Outcomes

After completing this project, I learned:

- Building React applications with Vite.
- Creating reusable React components.
- Managing application state using React Hooks.
- Implementing calculator logic.
- Creating production builds.
- Writing Dockerfiles.
- Using Multi-Stage Docker Builds.
- Serving React applications with Nginx.

---

# 📷 Future Improvements

- Scientific Calculator
- Memory Functions (M+, M-, MR, MC)
- Copy Result
- Unit Converter
- Currency Converter
- Better Animations
- Sound Effects
- PWA Support

---

# 📚 Additional Documentation

This project also contains:

- 📘 **notes.md** – Detailed notes about React, Docker, Multi-Stage Builds, and Nginx.
- 📙 **commands.md** – Frequently used npm, Docker, and Git commands.

---

# 👩‍💻 Author

**Prachi Patil**

Final Year Engineering Student

Learning:

- Docker
- Jenkins
- Kubernetes
- DevOps
- React

---

# ⭐ If you found this project helpful, consider giving it a star!
