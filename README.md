## Let's Climb
This is a SPA written in Vue and interacts with a Rails REST framework

### To Run Locally


Here is the step by step setup/installation process:
``` bash
# setup front-end
cd climb-app-vue
npm install

npm run serve

# prod build with js minification and optimizations
npm run build


# install back-end
cd climb-app-api
bundle install

rake db:create db:migrate

rails s
```

Or to run it in one fellow swoop:
```
(cd climb-app-api/ && (rails s > dev/log.txt &) && cd ..) && (cd climb-app-vue/ && npm run serve)
```

### Tech Stack

Languages:
- Ruby
- Javascript ES6

Database:
- PostgreSQL

Backend:
- Rails

Frontend:
- Vue.js

OS/Containerization:
- Docker
- Docker Compose
