#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const templateDir = path.join(__dirname, "..", "template");
const targetDir = process.cwd();

async function copyTemplate() {
  try {
    // Prompt user for input
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "includeSocketIO",
        message: "Do you want to include Socket.IO?",
        default: true,
      },
    ]);

    // Copy base template files (excluding specific files and folders)
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        // Exclude files and folders based on the user's choice
        const excludedPaths = [
          "serverWithSocket.js",
          "serverWithoutSocket.js",
          "config",
          "middleware",
          "socket",
          "utils",
          "validator",
          path.join("api", "config"),
          path.join("api", "middleware"),
          path.join("api", "utils"),
          path.join("api", "validator"),
        ];
        return !excludedPaths.some((p) => src.includes(p));
      },
    });

    // Conditionally copy the appropriate server file and other relevant files
    if (answers.includeSocketIO) {
      await fs.copy(
        path.join(templateDir, "serverWithSocket.js"),
        path.join(targetDir, "server.js")
      );
      await fs.copy(
        path.join(templateDir, "config"),
        path.join(targetDir, "config")
      );
      await fs.copy(
        path.join(templateDir, "middleware"),
        path.join(targetDir, "middleware")
      );
      await fs.copy(
        path.join(templateDir, "socket"),
        path.join(targetDir, "socket")
      );
      // Additional files related to Socket.IO (e.g., utils and validator)
      await fs.copy(
        path.join(templateDir, "utils"),
        path.join(targetDir, "utils")
      );
      await fs.copy(
        path.join(templateDir, "validator"),
        path.join(targetDir, "validator")
      );

      console.log(
        chalk.green("Server setup with Socket.IO completed successfully.")
      );
    } else {
      await fs.copy(
        path.join(templateDir, "serverWithoutSocket.js"),
        path.join(targetDir, "server.js")
      );
      // Copy the base `api` folder
      const apiFolder = path.join(templateDir, "api");
      const apiFolder2 = path.join(targetDir, "api");

      await fs.copy(
        path.join(apiFolder, "config"),
        path.join(apiFolder2, "config")
      );
      await fs.copy(
        path.join(apiFolder, "middleware"),
        path.join(apiFolder2, "middleware")
      );
      await fs.copy(
        path.join(apiFolder, "utils"),
        path.join(apiFolder2, "utils")
      );
      await fs.copy(
        path.join(apiFolder, "validator"),
        path.join(apiFolder2, "validator")
      );

      console.log(
        chalk.green("Server setup without Socket.IO completed successfully.")
      );
    }

    console.log(chalk.green("Package installed successfully!"));
  } catch (err) {
    console.error(chalk.red("Error installing template:", err));
  }
}

copyTemplate();
