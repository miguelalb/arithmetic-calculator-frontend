# arithmetic-calculator-frontend

This project is a simple calculator that allows users to perform basic mathematical operations (addition, subtraction, multiplication, division) and also generate a random string. Each one of these operations have a separate cost per request; users have an initial credit/balance and each request updates their balance accordingly.
This Repo contains the code for the **frontend**, you can find the [backend source code and deployment instructions here](https://github.com/miguelalb/arithmetic-calculator-backend).  

After running deploy on the backend, an `env.json` file will be created at the root of the backend project repo. This file contains the outputs of the CloudFormation stack, including the **service endpoint** and the **AWS Cognito Hosted UI login URL** for users to login.  
Create a `.env.local` file at the root of this frontend project code and fill out the    
`VUE_APP_SERVICE_ENDPOINT`  
`VUE_APP_LOGIN_HOSTEDUI_URL`  
environment variables.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
