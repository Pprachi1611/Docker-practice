# Notes

## What is Nginx?

Nginx is a high-performance web server that can also be used as a reverse proxy, load balancer, and HTTP cache.

---

## Why Use Nginx in Docker?

Running Nginx inside a Docker container allows the web server to run in an isolated environment without installing it directly on the operating system.

---

## What is Port Mapping?

Port mapping connects a port on the host machine to a port inside the Docker container.

Example:

Host Port → 8080

↓

Container Port → 80

When a browser accesses:

http://localhost:8080

Docker forwards the request to port 80 inside the container where Nginx is listening.

---

## What is Detached Mode?

The `-d` option runs the container in the background.

Without `-d`, the terminal remains attached to the container.

---

## What is a Bind Mount?

A bind mount links a folder from the host machine to a folder inside the container.

Example:

Host Folder

```
website/
```

↓

Container Folder

```
/usr/share/nginx/html
```

Any changes made to the local `website` folder are immediately reflected inside the running container.

---

## Difference Between Port Mapping and Bind Mount

| Port Mapping | Bind Mount |
|--------------|------------|
| Shares network ports | Shares files and folders |
| Uses `-p` | Uses `-v` |
| Enables browser access | Enables file sharing |

---

## Observations

- Nginx continues running until it is stopped.
- The default Nginx page is displayed when no custom website is mounted.
- Using a bind mount replaces the default webpage with local HTML files.
- Changes made to the local HTML file are reflected after refreshing the browser.

---

## Interview Questions

**Q. Why is Nginx suitable for Docker demonstrations?**

Because it is lightweight, starts quickly, and provides an easy way to understand web servers, port mapping, and bind mounts.

---

**Q. What is the purpose of `-p 8080:80`?**

It maps port **8080** on the host to port **80** inside the container.

---

**Q. Why is `/usr/share/nginx/html` important?**

It is the default directory from which Nginx serves static web files.

---

## Key Takeaways

- Nginx runs as a long-running container.
- Port mapping makes containerized applications accessible from the host.
- Bind mounts allow containers to use files stored on the host machine.
- Docker makes deploying a web server quick and consistent across environments.
