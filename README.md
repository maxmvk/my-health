# MyHealth

The project's goal - present information about a patients health, consolidate and integrate clinical information about a patient. Patient can generate avatar based on photo and settings, ask questions using chatbot, make appointments, connect devices, etc. It's web application based on Angular 9, Typescript, GraphQL, Apollo, connected to AWS. For creating avatar was used Loom AI, and Three.js framework for rendering 3d models and based on webgl.

[[_TOC_]]

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

For development, you will need to:

1. Install code editor (VS code, Webstorm, etc.).
2. Install Node.js for using `npm`.
3. Be sure to have `git` available.
4. Clone the project with SSH or HTTPS.
5. Install Angular CLI and dependencies using terminal:

```
    $ cd `<path to the project folder>`
    $ npm install  
```

6. Configure the environment.
7. Run the development server or build.

## Environment configuration

Check a folder with environment variables `<project folder path>/src/environments` then edit it with your settings. You need to specify environment variables.

Chatbot is connected to the project using Amazon lex bot service, so you need to use existing or create new user in Amazon and set permissions to `AmazonLexReadOnly` and `AmazonLexRunBotsOnly`, select region `virginia` and then you can use it's keys in the environment:

```
  lexRuntimeSettings: {
    accessKeyId: `<Amazon user access key ID>`,
    secretAccessKey: `<Amazon user secret access key>`,
    region: `<Selected region>`
  }
```

To use LoomAI you should authenticate with your credentials from site `https://loomai.com/` and use keys in the environment:

```
  clientCredentialsLoomAI: {
    CLIENT_ID: `<User key ID in Loom AI>`,
    CLIENT_SECRET: `<User secret key in Loom AI>`
  }
```

## Development server

For a dev server run the following command:

    $ ng serve

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

To generate a new component run the following command:

    $ ng generate component component-name

You can also use the following command:

    $ ng generate directive|pipe|service|class|guard|interface|enum|module

## Build

To build the project run the following command:

    $ ng build

The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deployment process

To simplify process install MobaXterm app. Run session using SSH:

- Remote host: `<SSH server name or IP address>`
- Specify username: `ubuntu`
- Use private key: `<Choose path to .pem key>`

Then connect, enter path `var/www/html` and replace files from the `dist/` directory of your project to this folder.
