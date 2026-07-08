# Project 05 - Commands Reference

## 1. Create React Project (Vite)

```bash
npm create vite@latest
```

Select:

```
Framework : React
Variant   : JavaScript
Linter    : ESLint
Package Manager : npm
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Start Development Server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 4. Install Additional Packages

Example:

```bash
npm install express
```

(Only if required)

---

## 5. Build Production Version

```bash
npm run build
```

Creates:

```
dist/
```

---

## 6. Preview Production Build

```bash
npm run preview
```

Default URL:

```
http://localhost:4173
```

---

# Docker Commands

## 7. Build Docker Image

```bash
docker build -t react-calculator .
```

Example:

```bash
docker build -t react-calculator:v1 .
```

---

## 8. List Docker Images

```bash
docker images
```

---

## 9. Run Docker Container

```bash
docker run -d -p 8080:80 --name react-calculator-container react-calculator
```

Open:

```
http://localhost:8080
```

---

## 10. List Running Containers

```bash
docker ps
```

---

## 11. List All Containers

```bash
docker ps -a
```

---

## 12. Stop Container

```bash
docker stop react-calculator-container
```

or

```bash
docker stop <container-id>
```

---

## 13. Start Existing Container

```bash
docker start react-calculator-container
```

---

## 14. Restart Container

```bash
docker restart react-calculator-container
```

---

## 15. Remove Container

```bash
docker rm react-calculator-container
```

---

## 16. Force Remove Running Container

```bash
docker rm -f react-calculator-container
```

---

## 17. Remove Docker Image

```bash
docker rmi react-calculator
```

---

## 18. Remove All Stopped Containers

```bash
docker container prune
```

---

## 19. Remove Unused Images

```bash
docker image prune
```

---

## 20. Remove Everything Unused

```bash
docker system prune
```

To remove everything including unused images:

```bash
docker system prune -a
```

---

## 21. View Container Logs

```bash
docker logs react-calculator-container
```

---

## 22. Follow Live Logs

```bash
docker logs -f react-calculator-container
```

---

## 23. Open Shell Inside Container

For Alpine-based images:

```bash
docker exec -it react-calculator-container sh
```

For Ubuntu/Debian images:

```bash
docker exec -it react-calculator-container bash
```

---

## 24. Inspect Container

```bash
docker inspect react-calculator-container
```

---

## 25. Inspect Docker Image

```bash
docker inspect react-calculator
```

---

## 26. View Running Processes

```bash
docker top react-calculator-container
```

---

## 27. Show Resource Usage

```bash
docker stats
```

---

## 28. Remove All Containers

```bash
docker rm -f $(docker ps -aq)
```

---

## 29. Remove All Images

```bash
docker rmi -f $(docker images -aq)
```

---

## 30. Check Docker Version

```bash
docker --version
```

---

## 31. Check Docker Information

```bash
docker info
```

---

# Git Commands (Optional)

Initialize Git

```bash
git init
```

Check Status

```bash
git status
```

Stage Files

```bash
git add .
```

Commit

```bash
git commit -m "Project 05 - React Calculator with Multi-Stage Docker Build"
```

Push

```bash
git push
```

---

# Useful npm Commands

Check Node Version

```bash
node -v
```

Check npm Version

```bash
npm -v
```

Install All Dependencies

```bash
npm install
```

Install One Package

```bash
npm install <package-name>
```

Remove Package

```bash
npm uninstall <package-name>
```

List Installed Packages

```bash
npm list
```

---

# Project Workflow

```text
Create React App
        │
        ▼
npm install
        │
        ▼
npm run dev
        │
        ▼
Develop Application
        │
        ▼
npm run build
        │
        ▼
docker build
        │
        ▼
docker run
        │
        ▼
Open Browser
```
