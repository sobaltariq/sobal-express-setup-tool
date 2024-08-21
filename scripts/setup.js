const { exec } = require("child_process");

exec("git init", (err, stdout, stderr) => {
  if (err) {
    console.error("Error initializing git:", stderr);
    return;
  }
  console.log("Git repository initialized:", stdout);
});
