const { spawn } = require("child_process");
const fs = require("fs");

function runPredictionPython() {
  return new Promise((resolve, reject) => {
    // Absolute path to your Python script
    const scriptPath = "D:/Futur-Cavanas-Ai/model.py"; 

   const process = spawn("python", ["D:/Futur-Cavanas-Ai/model.py"], {
  cwd: "D:/Futur-Cavanas-Ai", // 🔹 set working dir to AI repo
});

    let error = "";

    process.stderr.on("data", (data) => {
      error += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(`Python exited with code ${code}: ${error}`);
      } else {
        const predictionsPath = "D:/Python-Prediction/predictions.json";
        try {
          const data = JSON.parse(fs.readFileSync(predictionsPath, "utf-8"));
          resolve(data);
        } catch (err) {
          reject(`Failed to read predictions: ${err}`);
        }
      }
    });
  });
}

module.exports = runPredictionPython;
