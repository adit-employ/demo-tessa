# demo-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Docker stop all container
docker stop $(docker ps -a -q)
### Docker remove all container
docker rm -f $(docker ps -a -q)
### Docker remove volume unused
docker volume rm $(docker volume ls -q)
### Docker remove image
docker image prune
### Docker remove all images
docker rmi $(docker images -a -q)

### Docker container recruitment
docker run -it --network=xa-local_network --name recruitment widyansyahh/recruitment

docker run -it --network=xmu_network --name academy_ui gitxsis/academy_ui
docker run -it --network=xmu_network --name recruitment widyansyahh/recruitment

### image repo name 
widyansyahh/env-academy-fe

tes cicd


tes

testing