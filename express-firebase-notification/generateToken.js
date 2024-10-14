require("dotenv").config();
const { google } = require("googleapis");
const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());

async function getAccessToken() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    },
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  const accessToken = await auth.getAccessToken();
  return accessToken;
}

app.post("/send-notification", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const fcmUrl =
      "https://fcm.googleapis.com/v1/projects/angular-push-notificatio-fbf04/messages:send";

    const { title, body, token } = req.body;

    const message = {
      message: {
        notification: {
          title: title || "Title empty",
          body: body || "Body empty",
        },
        token: token,
      },
    };

    const response = await axios.post(fcmUrl, message, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send("Error sending notification: " + error.message);
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
