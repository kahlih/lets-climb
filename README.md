## Let's Climb
This is a SPA written in Vue and interacts with a Rails REST framework

### To Run Locally

Simply perform

``` bash
make run
```

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
