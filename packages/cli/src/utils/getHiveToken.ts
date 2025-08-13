import { getDomain } from "@hiveops/core";
import { randomBytes } from "crypto";
import express from "express";
import { createServer } from "http";
import open from "open";
import ora from "ora";

async function startLocalWebServer(port: number, expectedState: string): Promise<HiveTokenPair> {
  return new Promise((resolve, reject) => {
    const app = express();
    let server: ReturnType<typeof createServer>; // Holds the HTTP server instance

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Handles the incoming GET request to the local server.
    app.post("/", (req, res) => {
      const jsonBody = req.body;

      const token = JSON.parse(jsonBody.token || "{}") as HiveTokenPair;
      const state = jsonBody.state || "";
      const error = jsonBody.error || "";

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Access-Control-Allow-Origin", "*");

      if (error) {
        res.status(400);
        res.json({
          message: `API Key Fetch error from web page: ${error}`,
          status: "error",
        });
        server.close(() => reject(new Error(`API Key Fetch error from web page: ${error}`)));
        return;
      }

      if (!token) {
        res.status(400);
        res.json({
          message: "API key parameter missing in redirect fragment.",
          status: "error",
        });
        server.close(() => reject(new Error("API key parameter missing in redirect fragment.")));
        return;
      }

      if (state !== expectedState) {
        res.status(400);
        res.json({
          message: "State mismatch for API key redirect.",
          status: "error",
        });
        server.close(() => reject(new Error("State mismatch for API key redirect.")));
        return;
      }

      res.status(200);
      res.json({
        message: "API Key received successfully!",
        status: "success",
        token,
      });

      server.close(() => resolve(token)); // Resolve the promise with the extracted API key
    });

    // Start the local HTTP server and handle potential port conflicts.
    server = app
      .listen(port, () => {
        // console.log(`Local server listening on http://localhost:${port}`); // For debugging, not in final output
      })
      .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
          reject(new Error(`Port ${port} is already in use. Please close the application using it or configure a different port for the CLI.`));
        } else {
          reject(err);
        }
      });
  });
}

export const getHiveToken = async (): Promise<HiveTokenPair> => {
  const spinner = ora("Starting browser flow to get Token...").start();

  const localPort = 1234;
  const state = randomBytes(16).toString("hex"); // Generate a random state for CSRF protection

  // Construct the URL to the HiveOps OAuth page
  const webPageUrl = new URL(`http://console.${getDomain()}/cli-auth`);
  webPageUrl.searchParams.append("port", localPort.toString());
  webPageUrl.searchParams.append("state", state);

  spinner.text = "Opening browser. Please log in to HiveOps and approve authentication...";
  await open(webPageUrl.toString()); // Open the constructed URL in the user's default browser

  spinner.text = "Waiting for Token redirect from HiveOps...";

  const token = await startLocalWebServer(localPort, state);
  spinner.succeed("Token received!");

  return token;
};
