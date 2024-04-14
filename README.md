# Teamwork

### Database design
<img width="1215" alt="image" src="https://github.com/talk2rajeev/teamwork/assets/13742861/bfb2b567-71ae-44be-be9f-d2421afdbac2">


## Node server
    ### Start server
    ```
    cd server
    npm run dev
    ```

    ### Unit test of Node server
    For testing whole app
    ```npm run test```

    If you are getting below error, that means you need to install jest
    ```zsh: command not found: jest```

    #### install jest
    ```npm install -g jest```

    For testing a single file
    ```npm run test -- file_relative_path```
    Example
    ```npm run test -- controllers/teamController/__test__/team.controller.test.js```
