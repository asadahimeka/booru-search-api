# Booru Search API

API Service to search boorus using [@himeka/booru](https://github.com/asadahimeka/booru-search)

## Install Yarn

```
npm install -g yarn
```

## Get the source code and install packages

```
git clone https://github.com/asadahimeka/booru-search-api.git
cd booru-search-api
yarn install
```

## Build the application

```bash
yarn build
```

## Start the application

```bash
yarn start
```

By default this will launch the application on `http://localhost:3000`. You will need to either
[proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) requests from your web server
or change the [port](https://nextjs.org/docs/api-reference/cli#production) to serve the application directly.

## License

MIT
