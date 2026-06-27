# Commands Used

## Pull the Nginx Image

```bash
docker pull nginx
```

Downloads the official Nginx image from Docker Hub.

---

## View Available Images

```bash
docker images
```

Lists all images available on the local system.

---

## Run an Nginx Container

```bash
docker run -d --name my-nginx -p 8080:80 nginx
```

Starts the Nginx container in detached mode and maps port 8080 on the host to port 80 inside the container.

---

## View Running Containers

```bash
docker ps
```

Shows all currently running containers.

---

## View All Containers

```bash
docker ps -a
```

Displays both running and stopped containers.

---

## Stop the Container

```bash
docker stop my-nginx
```

Stops the running Nginx container.

---

## Start the Container

```bash
docker start my-nginx
```

Starts an existing stopped container.

---

## Remove the Container

```bash
docker rm my-nginx
```

Deletes the stopped container.

---

## Run Nginx with a Bind Mount

```bash
docker run -d --name my-nginx -p 8080:80 -v <local-folder>:/usr/share/nginx/html nginx
```

Mounts a local folder into the Nginx document root so that your own HTML files are served.
