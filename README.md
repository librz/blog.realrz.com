## My personal blog project

### setup

1. install dependency

npm install

2. run project locally

- start dev server: npm run dev

- view in browser: http://localhost:9001

### nginx config

on the server, nginx config is as follows:

```
server {
	listen 80;
	server_name www.blog.realrz.com blog.realrz.com;
	location / {
		proxy_pass http://127.0.0.1:9001;
	}
}
```

nginx, upon receiving a request will proxy it to port 9001

### deployment 

```sh
pm2 start npm --name "blog.realrz.com" -- run serve
```
