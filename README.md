# Teamwork

This project is not an unique idea, It solves what is already soved but in a simpler way. This project help in tracking the
progress of work. It helps in distributing tasks, managaging taks in the team. It helps in tracking the status.

This project is a full-stack project. It uses **Node** as server side programing, **React** as client side programming, **Jest** for Unit test and **Cypress** for E2E testing.

### Database design

<img width="1215" alt="image" src="https://github.com/talk2rajeev/teamwork/assets/13742861/bfb2b567-71ae-44be-be9f-d2421afdbac2">

## Node server

### Start server

    cd server
    npm install
    npm run dev

### Unit test of Node server

Go to `/server` directory and run below command

    npm run test

If you are getting `zsh: command not found: jest` error, then you need to install jest globally using `npm install -g jest` command

#### For testing a single file

    npm run test -- controllers/teamController/__test__/team.controller.test.js

### install & start app

    cd client-react-redux
    npm install
    npm start

### unit test for client

#### React client

Go to `/client-react-redux` directory and run below command

    npm run test

for testing a single file

    npm run test -- src/services/fetcher/fetcher.test.ts
