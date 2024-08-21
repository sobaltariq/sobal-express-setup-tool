# Sobal Express Setup Tool

**Sobal Express Setup Tool** is a command-line tool designed to scaffold Express.js projects with an optional Socket.IO setup. It creates a predefined folder structure, allowing developers to quickly get started with their projects.

## Features

- Scaffolds a project structure for Express.js applications.
- Offers optional integration with **Socket.IO**.
- Customizable server setup based on user input.
- Easy installation and setup with `npx`.

## Installation

To get started with the **Sobal Express Setup Tool**, you can use `npx` to run it directly without installing it globally:

```bash
npx sobal-express-setup-tool
```

## Usage

When you run the package, you will be prompted to choose whether to include Socket.IO in your setup. Based on your choice, the tool will generate the appropriate project files.

## Options

During the setup process, the tool will prompt you with the following question:

**Do you want to include Socket.IO?**

- **Yes**: This will include the config/, middleware/ socket/, utils/ and validator/ folders in root and configure the server with Socket.IO support.
- **No**: This will include these folders within the api/ directory and configure the server without Socket.IO support.

## Project Structure

The generated project will have the following structure:

### With Socket.IO

```
📁root
├── 📁api
│   ├── 📁controller
│   │   └── user.js
│   ├── 📁models
│   │   └── user.js
│   └── 📁router
│       └── user.js
├── 📁config
│   ├── 📁db
│   │   └── mongoDb.js
│   └── corsOptions.js
├── 📁middleware
│   ├── 📁express
│   │   ├── loginCheck.js
│   │   └── validateRequest.js
│   └── 📁socket
│       └── loginCheck.js
├── 📁socket
│   ├── 📁services
│   │   └── socketServices.js
│   └── socketServer.js
├── 📁utils
│   ├── jwtTokenUtils.js
│   └── passwordsUtils.js
├── 📁validator
│   └── user.js
├── .env
├── package-lock.json
├── package.json
├── packagesList.txt
└── server.js

```

### Without Socket.IO

```
📁root
├── 📁api
│   ├── 📁config
│   │   ├── 📁db
│   │   │   └── mongoDb.js
│   │   └── corsOptions.js
│   ├── 📁controller
│   │   └── user.js
│   ├── 📁middleware
│   │   ├── validateRequest.js
│   │   └── verifyToken.js
│   ├── 📁models
│   │   └── user.js
│   ├── 📁router
│   │   └── user.js
│   ├── 📁utils
│   │   ├── jwtTokenUtils.js
│   │   └── passwordsUtils.js
│   └── 📁validator
│       └── user.js
├── .env
├── package-lock.json
├── package.json
├── packagesList.txt
└── server.js

```

## Contributing

If you would like to contribute to this project, follow these steps:

- Fork the repository.
- Create a new branch (`git checkout -b feature/your-feature`).
- Make your changes and commit them (`git commit -am 'Add new feature'`).
- Push your branch to the remote repository (`git push origin feature/your-feature`).
- Open a Pull Request.

## License

This project is licensed under the MIT License.
