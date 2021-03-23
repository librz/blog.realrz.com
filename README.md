## blog.realrz.com source code, built with nextjs and react

### first-time setup

1. git clone

- using http (for anyone other than owner of this repo)

```sh
git clone https://github.com/librz/blog.realrz.com.git
```

- using ssh (for the owner of this repo)

```sh
git clone git@github.com:librz/blog.realrz.com.git
```

2. install dependency

npm install

note: to use npm, you should have node installed

### run project locally

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

### serve

npm run serve

#### upate

npm run update

update workflow: get the latest code, build it, kill the old process and start a new one

note: this only works on Ubuntu server, running this on mac or windows will throw errors
