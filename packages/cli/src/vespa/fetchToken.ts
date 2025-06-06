import { Command, OptionValues } from "commander";
import { randomBytes } from "crypto";
import express from "express";
import { createServer } from "http";
import open from "open";
import ora from "ora";

async function startLocalWebServer(port: number, expectedState: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const app = express();
    let server: ReturnType<typeof createServer>; // Holds the HTTP server instance

    // Handles the incoming GET request to the local server.
    app.post("/", (req, res) => {
      // Extract the URL fragment (e.g., "#api_key=xyz&state=abc") from `req.url`.
      // The fragment is everything after the first '#' character.
      const fragment = req.url.split("#")[1];

      if (!fragment) {
        // If no fragment, it indicates an invalid request or no key was provided.
        res.status(400).send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>API Key Missing</title>
                        <style>
                            body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f8f8; margin: 0; }
                            .container { background-color: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px; width: 90%; }
                            h1 { color: #dc3545; font-size: 2.5rem; margin-bottom: 20px; }
                            p { color: #555; font-size: 1.1rem; line-height: 1.6; }
                            @media (max-width: 600px) { .container { padding: 30px; } h1 { font-size: 2rem; } p { font-size: 1rem; } }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>API Key Not Found!</h1>
                            <p>No API key was received in the browser redirect. Please ensure you are logged in on the web page and the key is properly generated.</p>
                            <p>You can close this browser tab.</p>
                        </div>
                    </body>
                    </html>
                `);
        server.close(() => reject(new Error("No API key received in redirect fragment.")));
        return;
      }

      // Parse the fragment as URL search parameters to easily extract values.
      const params = new URLSearchParams(fragment);
      const apiKey = params.get("api_key");
      const state = params.get("state");
      const error = params.get("error"); // Check for explicit errors passed from the web page

      if (error) {
        // If the web page explicitly sent an error
        res.status(400).send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>API Key Fetch Failed</title>
                        <style>
                            body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f8f8; margin: 0; }
                            .container { background-color: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px; width: 90%; }
                            h1 { color: #dc3545; font-size: 2.5rem; margin-bottom: 20px; }
                            p { color: #555; font-size: 1.1rem; line-height: 1.6; }
                            @media (max-width: 600px) { .container { padding: 30px; } h1 { font-size: 2rem; } p { font-size: 1rem; } }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Failed to Get API Key!</h1>
                            <p>The web page reported an error: ${error}. Please try again from your CLI.</p>
                            <p>You can close this browser tab.</p>
                        </div>
                    </body>
                    </html>
                `);
        server.close(() => reject(new Error(`API Key Fetch error from web page: ${error}`)));
        return;
      }

      if (!apiKey) {
        // Should ideally be caught by the initial fragment check, but for robustness
        res.status(400).send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>API Key Missing</title>
                        <style>
                            body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f8f8; margin: 0; }
                            .container { background-color: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px; width: 90%; }
                            h1 { color: #dc3545; font-size: 2.5rem; margin-bottom: 20px; }
                            p { color: #555; font-size: 1.1rem; line-height: 1.6; }
                            @media (max-width: 600px) { .container { padding: 30px; } h1 { font-size: 2rem; } p { font-size: 1rem; } }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>API Key Not Found!</h1>
                            <p>The API key was not found in the redirect. Ensure the web page is configured correctly to return it.</p>
                            <p>You can close this browser tab.</p>
                        </div>
                    </body>
                    </html>
                `);
        server.close(() => reject(new Error("API key parameter missing in redirect fragment.")));
        return;
      }

      if (state !== expectedState) {
        // Critical security check: state mismatch indicates a potential Cross-Site Request Forgery (CSRF) attack.
        // The `state` parameter ensures that the redirect is legitimate and corresponds to the request
        // initiated by this specific CLI instance.
        res.status(400).send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Security Error</title>
                        <style>
                            body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f8f8; margin: 0; }
                            .container { background-color: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); text-align: center; max-width: 500px; width: 90%; }
                            h1 { color: #ffc107; font-size: 2.5rem; margin-bottom: 20px; }
                            p { color: #555; font-size: 1.1rem; line-height: 1.6; }
                            @media (max-width: 600px) { .container { padding: 30px; } h1 { font-size: 2rem; } p { font-size: 1rem; } }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Security Warning!</h1>
                            <p>State mismatch detected. This might indicate a security vulnerability. Please try getting the API key again.</p>
                            <p>You can close this browser tab.</p>
                        </div>
                    </body>
                    </html>
                `);
        server.close(() => reject(new Error("State mismatch for API key redirect.")));
        return;
      }

      // If all checks pass, send a success message to the browser to inform the user.
      res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>API Key Received</title>
                    <style>
                        body { font-family: 'Inter', sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #e6f7ff; margin: 0; }
                        .container { background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15); text-align: center; max-width: 500px; width: 90%; border: 1px solid #cceeff; }
                        h1 { color: #28a745; font-size: 2.5rem; margin-bottom: 20px; }
                        p { color: #333; font-size: 1.1rem; line-height: 1.6; }
                        .checkmark { display: block; margin: 0 auto 20px; width: 80px; height: 80px; }
                        .checkmark circle {
                            stroke-width: 4;
                            stroke: #28a745;
                            fill: none;
                            stroke-dasharray: 100;
                            stroke-dashoffset: 100;
                            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                        }
                        .checkmark path {
                            stroke-width: 4;
                            stroke: #28a745;
                            fill: none;
                            stroke-dasharray: 48;
                            stroke-dashoffset: 48;
                            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
                        }
                        @keyframes stroke {
                            100% { stroke-dashoffset: 0; }
                        }
                        @media (max-width: 600px) { .container { padding: 30px; } h1 { font-size: 2rem; } p { font-size: 1rem; } }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle cx="26" cy="26" r="25" fill="none"/>
                            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                        <h1>API Key Received!</h1>
                        <p>You have successfully retrieved your API key. You can now close this browser tab and return to your CLI.</p>
                        <p>Your CLI application is now ready to use.</p>
                    </div>
                </body>
                </html>
            `);

      server.close(() => resolve(apiKey)); // Resolve the promise with the extracted API key
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

export const fetchToken = async (_opts: OptionValues) => {
  const spinner = ora("Starting browser flow to get API key...").start();
  try {
    const localPort = 1234;
    const state = randomBytes(16).toString("hex"); // Generate a random state for CSRF protection

    // Construct the URL to the Next.js page, passing the `redirect_uri` and `state` as query parameters.
    const webPageUrl = new URL(`http://localhost:3000/cli-auth`);
    webPageUrl.searchParams.append("port", localPort.toString());
    webPageUrl.searchParams.append("state", state);

    spinner.text = "Opening browser. Please log in on the web page and approve API key retrieval...";
    await open(webPageUrl.toString()); // Open the constructed URL in the user's default browser

    spinner.text = "Waiting for API key redirect from the web page...";
    // Wait for the local server to receive the API key via the browser redirect.
    const apiKey = await startLocalWebServer(localPort, state);
    spinner.succeed("API Key received!");

    // await storeApiKey(apiKey); // Store the received API key
    spinner.succeed("API Key successfully stored!");

    console.log(`\nYour API Key: ${apiKey}`);
  } catch (error: any) {
    spinner.fail(`Failed to get API key: ${error.message}`);
    process.exit(1); // Exit with an error code on failure
  }
};

export const fetchTokenCommand = new Command("fetch-token")
  .description("Fetch Vespa token")
  .option("-s, --stack-hrn <stackHrn>", "Stack HRN")
  .option("-u, --username <username>", "Username for authentication")
  .option("-p, --password <password>", "Password for authentication")
  .action(fetchToken);
